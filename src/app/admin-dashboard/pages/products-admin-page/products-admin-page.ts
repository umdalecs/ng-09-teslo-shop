import { Component, inject } from '@angular/core';
import { ProductTable } from '@/products/components/product-table/product-table';
import { ProductsService } from '@/products/services/products-service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable],
  templateUrl: './products-admin-page.html',
  styles: ``,
})
export class ProductsAdminPage {
}
