import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product-response';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@/auth/interfaces/user';

const BASE_URL = environment.backendUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}
const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: 'men',
  tags: [],
  images: [],
  user: {} as User,
};

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
          this.cacheProducts.set(key, value);
        })
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.cacheProduct.has(idSlug))
      return of(this.cacheProduct.get(idSlug)!);

    return this.http.get<Product>(`${BASE_URL}/products/${idSlug}`).pipe(
      delay(2000),
      tap((value) => {
        this.cacheProduct.set(idSlug, value);
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    if (id === 'new') return of(emptyProduct);

    if (this.cacheProduct.has(id)) return of(this.cacheProduct.get(id)!);

    return this.http.get<Product>(`${BASE_URL}/products/${id}`).pipe(
      delay(2000),
      tap((value) => {
        this.cacheProduct.set(id, value);
      })
    );
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>
  ): Observable<Product> {
    if (this.cacheProduct.has(id)) return of(this.cacheProduct.get(id)!);

    return this.http
      .patch<Product>(`${BASE_URL}/products/${id}`, productLike)
      .pipe(tap((value) => [this.updateProductCache(value)]));
  }

  updateProductCache(product: Product) {
    this.cacheProduct.set(product.id, product);

    this.cacheProducts.forEach((productResponse) => {
      productResponse.products = productResponse.products.map((item) =>
        item.id === product.id ? product : item
      );
    });
  }

  createProduct(productLike: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${BASE_URL}/products`, productLike);
  }
}
