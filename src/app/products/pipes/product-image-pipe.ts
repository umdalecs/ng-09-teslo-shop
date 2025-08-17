import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.backendUrl;

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  transform(value: string | string[] | null): string {
    if (typeof value === 'string')
      return `${BASE_URL}/files/product/${value}`;

    if (value instanceof Array && value.length >= 1)
      return `${BASE_URL}/files/product/${value[0]}`;

    return '/assets/images/no-image.jpg'
  }

}
