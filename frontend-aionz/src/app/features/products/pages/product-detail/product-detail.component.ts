import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Title, Meta } from '@angular/platform-browser';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatChipsModule,
  ],
  template: `
    <div class="container">
      <div class="loading" *ngIf="loading">
        <mat-spinner></mat-spinner>
      </div>

      <div class="error" *ngIf="error">
        <p>Produto não encontrado ou ocorreu um erro ao carregar.</p>
        <button mat-raised-button color="primary" (click)="goBack()">Voltar para lista</button>
      </div>

      <div *ngIf="!loading && !error && product" class="product-detail">
        <div class="header">
          <button mat-button (click)="goBack()" class="back-button">
            <mat-icon>arrow_back</mat-icon> Voltar para lista
          </button>
          <h1>Desafio Aionz</h1>
        </div>
        
        <div class="product-content">
          <div class="product-image">
            <img [src]="product.imageUrl || 'assets/placeholder.jpg'" [alt]="product.name">
          </div>
          <div class="product-info">
            <h2>{{ product.name }}</h2>
            
            <div class="price-section">
              <span class="price">{{ product.price | currency:'BRL':'symbol':'1.2-2' }}</span>
              <mat-chip *ngIf="product.category" color="primary" class="category">
                {{ product.category }}
              </mat-chip>
            </div>
            
            <div class="description" *ngIf="product.description">
              <h3>Descrição</h3>
              <p>{{ product.description }}</p>
            </div>
            
            <div class="meta">
              <span>Adicionado em: {{ product.createdAt | date:'dd/MM/yyyy' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .loading, .error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 0;
      min-height: 50vh;
    }
    
    .error p {
      color: #f44336;
      margin-bottom: 20px;
      font-size: 1.1em;
      text-align: center;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .header h1 {
      margin: 0;
      color: #3f51b5;
      font-size: 1.8em;
    }
    
    .back-button {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .product-content {
      display: flex;
      gap: 40px;
      margin-top: 20px;
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    
    .product-image {
      flex: 1;
      max-width: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
    }
    
    .product-image img {
      max-width: 100%;
      max-height: 400px;
      object-fit: contain;
      border-radius: 4px;
    }
    
    .product-info {
      flex: 1;
      padding: 0 20px;
    }
    
    .product-info h2 {
      margin: 0 0 15px 0;
      color: #333;
      font-size: 2em;
    }
    
    .price-section {
      display: flex;
      align-items: center;
      gap: 15px;
      margin: 20px 0 30px;
    }
    
    .price {
      font-size: 2em;
      color: #f44336;
      font-weight: bold;
    }
    
    .description {
      margin: 30px 0;
      line-height: 1.7;
      color: #444;
      font-size: 1.1em;
    }
    
    .meta {
      color: #757575;
      font-size: 0.9em;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: space-between;
    }
    
    @media (max-width: 900px) {
      .product-content {
        flex-direction: column;
        padding: 20px;
      }
      
      .product-image {
        max-width: 100%;
        margin-bottom: 20px;
      }
      
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
      
      .header h1 {
        font-size: 1.5em;
      }
      
      .product-info h2 {
        font-size: 1.6em;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = false;

    this.productService.getProductById(+id).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.updateSeoMetadata(product);
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  private updateSeoMetadata(product: Product): void {
    if (!product) return;

    this.title.setTitle(`${product.name} | Aionz Store`);

    const description = product.description || product.name;
    const imageUrl = product.imageUrl || 'assets/placeholder.jpg';
    
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: product.name });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:type', content: 'product' });
    this.meta.updateTag({ property: 'product:price:amount', content: product.price.toString() });
    this.meta.updateTag({ property: 'product:price:currency', content: 'BRL' });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
