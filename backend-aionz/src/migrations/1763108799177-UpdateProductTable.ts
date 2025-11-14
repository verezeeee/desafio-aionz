import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductTable1700000000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable("product");
        
        if (tableExists) {
            await queryRunner.query(`
                ALTER TABLE "product" 
                ALTER COLUMN "createdAt" DROP NOT NULL,
                ALTER COLUMN "updatedAt" DROP NOT NULL;
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable("product");
        if (tableExists) {
            await queryRunner.query(`
                ALTER TABLE "product" 
                ALTER COLUMN "createdAt" SET NOT NULL,
                ALTER COLUMN "updatedAt" SET NOT NULL;
            `);
        }
    }
}