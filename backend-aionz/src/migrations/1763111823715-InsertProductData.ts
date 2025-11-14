import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';

export class InsertProductData1700000000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const uploadsPath = path.join(__dirname, '../../uploads');
        
        try {
            const files = fs.readdirSync(uploadsPath);
            
            const imageFiles = files.filter(file => 
                ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase())
            );

            for (const file of imageFiles) {
                const productName = path.parse(file).name
                    .replace(/[-_]/g, ' ')  
                    .replace(/\b\w/g, l => l.toUpperCase()); 
                
                await queryRunner.query(`
                    INSERT INTO "product" 
                    ("name", "description", "price", "category", "imageUrl", "createdAt", "updatedAt")
                    VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
                `, [
                    productName,
                    `Descrricao ${productName}`,
                    Math.floor(Math.random() * 1000) + 100, 
                    'General', 
                    `/uploads/${file}` 
                ]);
            }
            
            console.log(`Inserted ${imageFiles.length} products from uploads folder`);
        } catch (error) {
            console.error('Error reading uploads directory:', error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "product" WHERE "imageUrl" LIKE '/uploads/%'`);
    }
}