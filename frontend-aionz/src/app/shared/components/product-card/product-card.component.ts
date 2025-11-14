import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <mat-card class="product-card">
      <img mat-card-image [src]="product.imageUrl || 'assets/placeholder.jpg'" [alt]="product.name">
      <mat-card-content>
        <h2>{{ product.name }}</h2>
        <p class="price">{{ product.price | currency:'BRL':'symbol':'1.2-2' }}</p>
        <p class="category" *ngIf="product.category">{{ product.category }}</p>
      </mat-card-content>
      <mat-card-actions>
        <a mat-raised-button color="primary" [routerLink]="['/produto', product.id]">Ver Detalhes</a>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .product-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: transform 0.2s, box-shadow 0.2s;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
    
    .price {
      color: #f44336;
      font-size: 1.2em;
      font-weight: bold;
      margin: 10px 0;
    }
    
    .category {
      color: #757575;
      font-size: 0.9em;
    }
    
    mat-card-actions {
      margin-top: auto;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
}
