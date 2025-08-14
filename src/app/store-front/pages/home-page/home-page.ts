import { Component, inject } from '@angular/core';
import { ProductList } from "@/products/components/product-list/product-list";

@Component({
  selector: 'front-home-page',
  imports: [ProductList],
  templateUrl: './home-page.html',
  styles: ``,
})
export class HomePage {
}
