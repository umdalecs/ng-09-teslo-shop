import { Product } from '@/products/interfaces/product-response';
import { ProductImagePipe } from '@/products/pipes/product-image-pipe';
import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-card',
  imports: [RouterLink, ProductImagePipe, SlicePipe],
  templateUrl: './product-card.html',
  styles: ``
})
export class ProductCard {
  public readonly product = input.required<Product>();
}
