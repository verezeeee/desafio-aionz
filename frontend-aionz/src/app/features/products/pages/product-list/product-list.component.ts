import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../shared/models/product.model';
import { ProductCardComponent } from '../../../../shared/components';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    ProductCardComponent
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Desafio Aionz</h1>
        <h2>Lista de Produtos</h2>
      </div>
      
      <div class="loading" *ngIf="loading">
        <mat-spinner></mat-spinner>
      </div>

      <div class="error" *ngIf="error">
        <p>Ocorreu um erro ao carregar os produtos. Por favor, tente novamente.</p>
      </div>

      <div class="product-grid" *ngIf="!loading && !error">
        <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .header h1 {
      color: #3f51b5;
      margin: 0 0 10px 0;
      font-size: 2.2em;
    }
    
    .header h2 {
      color: #555;
      margin: 0;
      font-weight: 400;
      font-size: 1.4em;
    }
    
    .loading, .error {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
      padding: 40px 0;
    }
    
    .error {
      flex-direction: column;
      text-align: center;
    }
    
    .error p {
      color: #f44336;
      font-weight: 500;
      margin-bottom: 20px;
      font-size: 1.1em;
    }
    
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 25px;
      padding: 20px 0;
    }
    
    mat-card-actions {
      padding: 16px;
      margin-top: auto;
    }
    
    img {
      height: 200px;
      object-fit: cover;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = false;

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading = true;
    this.error = false;
    
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
