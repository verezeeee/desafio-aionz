import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductTable1763108799177 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Make sure the columns exist and are nullable
        await queryRunner.query(`
            ALTER TABLE "product" 
            ALTER COLUMN "createdAt" DROP NOT NULL,
            ALTER COLUMN "updatedAt" DROP NOT NULL;
        `);

        // Update existing rows with current timestamp if null
        await queryRunner.query(`
            UPDATE "product" 
            SET "createdAt" = NOW() 
            WHERE "createdAt" IS NULL;
            
            UPDATE "product" 
            SET "updatedAt" = NOW() 
            WHERE "updatedAt" IS NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert the changes if needed
        await queryRunner.query(`
            ALTER TABLE "product" 
            ALTER COLUMN "createdAt" SET NOT NULL,
            ALTER COLUMN "updatedAt" SET NOT NULL;
        `);
    }
}
