import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/products/pages/product-list/product-list.component')
        .then(m => m.ProductListComponent),
    title: 'Produtos | Aionz Store'
  },
  {
    path: 'produto/:id',
    loadComponent: () => 
      import('./features/products/pages/product-detail/product-detail.component')
        .then(m => m.ProductDetailComponent),
    title: 'Detalhes do Produto | Aionz Store'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
