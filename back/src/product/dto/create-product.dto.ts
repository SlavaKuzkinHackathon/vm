import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString,} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Наименования товара',
    description: 'Наименования товара',
  })
  @IsNotEmpty({ message: 'Нет наименования товара' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({
    example: 'Описание товара',
    description: 'Описание товара',
  })
  @IsNotEmpty({ message: 'Нет описание товара' })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({
    example: 9000,
    description: 'Цена товара',
  })
  @IsNotEmpty({ message: 'Нет цены товара' })
  readonly price: number;

  @ApiProperty({
    example: 3,
    description: 'Количество товара',
  })
  @IsNotEmpty({ message: 'Не указано количество товара' })
  readonly in_stock: number;
}
