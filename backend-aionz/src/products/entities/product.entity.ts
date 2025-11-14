import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    category: string;

    @Column({ name: 'imageUrl', nullable: true })
    imageUrl: string;

    @Column({ name: 'createdAt', type: 'timestamp', nullable: true })
    createdAt: Date = new Date();

    @Column({ name: 'updatedAt', type: 'timestamp', nullable: true })
    updatedAt: Date = new Date();
}
