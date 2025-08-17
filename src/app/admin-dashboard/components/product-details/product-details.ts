import { Product } from '@/products/interfaces/product-response';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductCarousel } from '@/products/components/product-carousel/product-carousel';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@/utils/form-utils';
import { FormErrorLabel } from '@/shared/components/form-error-label/form-error-label';
import { ProductsService } from '@/products/services/products-service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
  styles: ``,
})
export class ProductDetails implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly productsService = inject(ProductsService);
  private router = inject(Router);

  public readonly product = input.required<Product>();
  protected readonly sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  protected wasSaved = signal(false);

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(formLike as any);
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
  }

  protected productForm = this.fb.group({
    title: ['', [Validators.required], []],
    description: ['', [Validators.required], []],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
      [],
    ],
    price: [0, [Validators.required, Validators.min(0)], []],
    stock: [0, [Validators.required, Validators.min(0)], []],
    tags: ['', [], []],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
      [],
    ],
    sizes: [[''], [], []],
    images: [[''], [], []],
  });

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags
        ?.toLowerCase()
        .split(',')
        .map((tag) => tag.trim()),
    };

    if (this.product().id === 'new') {
      this.productsService.createProduct(productLike).subscribe((product) => {
        console.log(product);
      });
      this.router.navigateByUrl('/dashboard/products');
    } else {
      this.productsService
        .updateProduct(this.product().id, productLike)
        .subscribe((producto) => {
          console.log('Producto actualizado!!');
        });

      this.wasSaved.set(true);

      setTimeout(() => {
        this.wasSaved.set(false);
      }, 2000);
    }
  }

  onSizeClick(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes?.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }
}
