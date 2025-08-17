import { ProductImagePipe } from '@/products/pipes/product-image-pipe';
import { ProductsService } from '@/products/services/products-service';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Pagination } from "@/shared/components/pagination/pagination";
import { PaginationService } from '@/shared/components/pagination/pagination-service';

@Component({
  selector: 'product-table',
  imports: [ProductImagePipe, RouterLink, CurrencyPipe, Pagination],
  templateUrl: './product-table.html',
  styles: ``
})
export class ProductTable {
  private productsService = inject(ProductsService);
  protected paginationService = inject(PaginationService);

  public limit = signal<number>(10);

  protected offset = linkedSignal(
    () => (this.paginationService.currentPage() - 1) * this.limit()
  );

  protected productResource = rxResource({
    params: () => ({
      limit: this.limit(),
      offset: this.offset(),
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts(params);
    },
  });
}
