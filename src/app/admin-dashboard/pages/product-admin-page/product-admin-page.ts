import { ProductsService } from '@/products/services/products-service';
import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductDetails } from "@/admin-dashboard/components/product-details/product-details";

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetails],
  templateUrl: './product-admin-page.html',
  styles: ``,
})
export class ProductAdminPage {
  private productsService = inject(ProductsService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  protected productId = toSignal(
    this.activatedRoute.paramMap.pipe(map((params) => params.get('id')))
  );

  protected productResource = rxResource({
    params: () => ({ id: this.productId() ?? '' }),
    stream: ({ params }) => {
      return this.productsService.getProductById(params.id);
    },
  });

  private redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigateByUrl('/dashboard/products');
    }
  });
}
