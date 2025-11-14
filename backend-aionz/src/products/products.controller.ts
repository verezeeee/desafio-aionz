import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'O produto foi criado com sucesso.', type: Product })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Entrada inválida.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        category: { type: 'string' },
      },
      required: ['name', 'price'],
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Apenas imagens são permitidas!'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    if (file) {
      createProductDto.imageUrl = `/uploads/${file.filename}`;
    }
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os produtos' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retorna todos os produtos.', type: [Product] })
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um produto por ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retorna o produto com o ID fornecido.', type: Product })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto não encontrado.' })
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um produto' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'O produto foi atualizado com sucesso.', type: Product })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto não encontrado.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Entrada inválida.' })
  @ApiBody({ type: UpdateProductDto })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um produto' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'O produto foi deletado com sucesso.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto não encontrado.' })
  async remove(@Param('id') id: string) {
    await this.productsService.remove(+id);
    return { message: 'Product deleted successfully' };
  }
}
