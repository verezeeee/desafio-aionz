import { type Meta, type StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { ProductCardComponent } from './product-card.component';
import { Product } from '../../models/product.model';

// Mock Product Data
const mockProduct: Product = {
  id: 1,
  name: 'Exemplo de Produto',
  description: 'Esta é uma descrição detalhada do produto de exemplo.',
  price: 199.99,
  category: 'Eletrônicos',
  imageUrl: 'http://localhost:3000/uploads/desk.jpg',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const meta: Meta<ProductCardComponent> = {
  title: 'Components/ProductCard',
  component: ProductCardComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]), // Provide a mock router configuration
        provideAnimations(), // Provide animations for Angular Material
      ],
    }),
  ],
  argTypes: {
    product: {
      control: 'object',
      description: 'O objeto `Product` a ser exibido no card.',
      table: {
        type: { 
          summary: 'Product',
          detail: `interface Product {\n  id: number;\n  name: string;\n  description?: string;\n  price: number;\n  category?: string;\n  imageUrl?: string;\n  createdAt: Date;\n  updatedAt: Date;\n}`
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ProductCardComponent>;

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};

export const WithLongName: Story = {
  args: {
    product: {
      ...mockProduct,
      id: 2,
      name: 'Produto com um Nome Muito Longo para Testar Quebra de Linha e Responsividade',
    },
  },
};

export const WithoutImage: Story = {
  args: {
    product: {
      ...mockProduct,
      id: 3,
      imageUrl: '',
    },
  },
};

export const HighPrice: Story = {
  args: {
    product: {
      ...mockProduct,
      id: 4,
      price: 9999.99,
    },
  },
};
