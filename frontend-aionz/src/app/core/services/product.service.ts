import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000';
  private apiUrl = `${this.baseUrl}/products`;
  private http = inject(HttpClient);

  private addBaseUrlToProductImages(product: Product): Product {
    return {
      ...product,
      imageUrl: product.imageUrl 
        ? `${this.baseUrl}${product.imageUrl.startsWith('/') ? '' : '/'}${product.imageUrl}`
        : 'assets/placeholder.jpg'
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => products.map(product => this.addBaseUrlToProductImages(product)))
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      map(product => this.addBaseUrlToProductImages(product))
    );
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/slug/${slug}`).pipe(
      map(product => this.addBaseUrlToProductImages(product))
    );
  }
}
