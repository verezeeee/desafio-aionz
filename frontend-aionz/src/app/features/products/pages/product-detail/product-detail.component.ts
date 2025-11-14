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
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
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
