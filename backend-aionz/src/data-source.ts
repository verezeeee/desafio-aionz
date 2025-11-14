import { DataSource } from 'typeorm';
import { Product } from './products/entities/product.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'desafio_db',
  entities: [Product],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
