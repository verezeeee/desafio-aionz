import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1700000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "product" (
                "id" SERIAL PRIMARY KEY,
                "name" character varying NOT NULL,
                "description" text,
                "price" numeric(10,2) NOT NULL,
                "category" character varying,
                "imageUrl" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }
}