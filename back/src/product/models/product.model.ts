import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface ProductCreationAttrs {
  name: string;
  price: number;
  image: string;
}

@Table({ tableName: 'products', updatedAt: false })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Идентификатор товара' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({ example: 'Диван', description: 'Наименование товара' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Описание', description: 'Описание товара' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  description: string;

  @ApiProperty({ example: 'Модель', description: 'Модель товара' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  model: string;

  @ApiProperty({ example: 1000, description: 'Цена товара' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ApiProperty({ example: 20, description: 'Количество' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  in_stock: number;

  @ApiProperty({
    example: '91643f20-bf90-4ad6-a339-21460da42107.jpg',
    description: 'Наименование изображения товара',
  })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: 5, description: 'Рейтинг товара' })
  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  rating: number;
}
