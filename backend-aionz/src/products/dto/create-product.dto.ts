import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'O nome do produto', example: 'Smartphone' })
  name: string;

  @ApiProperty({ 
    description: 'A descrição do produto', 
    example: 'exemplo descricao',
    required: false 
  })
  description?: string;

  @ApiProperty({ 
    description: 'O preço do produto', 
    example: 999.99,
    type: Number 
  })
  price: number;

  @ApiProperty({ 
    description: 'A categoria do produto', 
    example: 'Eletrônicos',
    required: false 
  })
  category?: string;

  @ApiProperty({ 
    description: 'A URL da imagem do produto', 
    example: '/uploads/1234567890.jpg',
    required: false 
  })
  imageUrl?: string;
}
