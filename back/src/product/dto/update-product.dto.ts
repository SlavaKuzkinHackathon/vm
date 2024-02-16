import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Наименования товара...',
    description: 'Наименования товара',
  })
  readonly name: string;

  @ApiProperty({
    example: 'Описание товара...',
    description: 'Описание товара',
  })
  readonly description: string;

  @ApiProperty({
    example: 1000,
    description: 'Цена товара',
  })
  readonly price: number;

  @ApiProperty({
    example: 1000,
    description: 'Количество товара',
  })
  readonly in_stock: number;
}
