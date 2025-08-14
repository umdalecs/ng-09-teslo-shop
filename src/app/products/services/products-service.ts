import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Gender,
  Product,
  ProductsResponse,
} from '../interfaces/product-response';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.backendUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts({
    limit = 10,
    offset = 0,
    gender = '',
  }: Options): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${BASE_URL}/products`, {
      params: {
        limit,
        offset,
        gender,
      },
    });
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/products/${idSlug}`);
  }
}
