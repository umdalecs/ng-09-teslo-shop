import { ProductsService } from '@/products/services/products-service';
import { AfterViewInit, Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCarousel } from "@/products/components/product-carousel/product-carousel";

@Component({
  selector: 'front-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
  styles: ``,
})
export class ProductPage {
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  private productIdSlug = linkedSignal(
    () => this.activatedRoute.snapshot.params['idSlug']
  );

  protected productResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug() }),
    stream: ({ params }) => {
      return this.productsService.getProductByIdSlug(params.idSlug);
    },
  });
}
