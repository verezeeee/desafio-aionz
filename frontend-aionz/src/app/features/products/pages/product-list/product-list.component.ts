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
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
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
