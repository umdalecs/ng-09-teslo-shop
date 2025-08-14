import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductList } from '@/products/components/product-list/product-list';
import { I18nSelectPipe } from '@angular/common';

@Component({
  selector: 'front-gender-page',
  imports: [ProductList, I18nSelectPipe],
  templateUrl: './gender-page.html',
  styles: ``,
})
export class GenderPage {
  private activatedRoute = inject(ActivatedRoute);

  protected titles = { men: 'Hombre', women: 'Mujer', kids: 'Niños' };

  protected gender = toSignal(
    this.activatedRoute.params.pipe(map(({ gender }) => gender))
  );
}
