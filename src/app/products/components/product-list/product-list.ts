import { ProductsService } from '@/products/services/products-service';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styles: ``,
})
export class ProductList {
  private productsService = inject(ProductsService);

  public gender = input('');
  public limit = input(12);
  public offset = input(0);

  protected productsResource = rxResource({
    params: () => ({
      gender: this.gender(),
      limit: this.limit(),
      offset: this.offset(),
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts(params);
    },
  });
}
