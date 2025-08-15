import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product-response';
import { Observable, of, tap } from 'rxjs';
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

  private cacheProducts = new Map<string, ProductsResponse>();
  private cacheProduct = new Map<string, Product>();

  getProducts({
    limit = 10,
    offset = 0,
    gender = '',
  }: Options): Observable<ProductsResponse> {
    const url = new URL(`${BASE_URL}/products`);

    const key = `${gender}.${limit}.${offset}`;

    if (this.cacheProducts.has(key)) {
      return of(this.cacheProducts.get(key)!);
    }

    return this.http
      .get<ProductsResponse>(url.toString(), {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        tap((value) => {
          console.log(value);
          this.cacheProducts.set(key, value);
        })
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.cacheProduct.has(idSlug))
      return of(this.cacheProduct.get(idSlug)!);

    return this.http.get<Product>(`${BASE_URL}/products/${idSlug}`).pipe(
      tap((value) => {
        console.log(value);
        this.cacheProduct.set(idSlug, value);
      })
    );
  }
}
