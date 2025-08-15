import { ProductsService } from '@/products/services/products-service';
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../product-card/product-card';
import { Pagination } from '@/shared/components/pagination/pagination';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaginationService } from '@/shared/components/pagination/pagination-service';

@Component({
  selector: 'product-list',
  imports: [ProductCard, Pagination],
  templateUrl: './product-list.html',
  styles: ``,
})
export class ProductList {
  private productsService = inject(ProductsService);
  protected paginationService = inject(PaginationService)

  public gender = input<string>('');
  public limit = input<number>(12);

  protected offset = linkedSignal(
    () => (this.paginationService.currentPage() - 1) * this.limit()
  );

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
