import { ApiProperty } from '@nestjs/swagger';
import { Op } from 'sequelize';
import { Product } from '../models/product.model';




export class FindOneResponse extends Product {}


export class GetByNameResponse extends Product {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class GetByNameRequest {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class PaginateAndFilterResponse {
    @ApiProperty({ example: 10 })
    count: number;
  
    @ApiProperty({ type: Product, isArray: true })
    rows: Product;
  }

  export class SearchByLetterResponse extends Product {
    @ApiProperty({ example: 'Provident incidunt.' })
    name: string;
  }

  export class SearchResponse extends PaginateAndFilterResponse {
    @ApiProperty({ type: SearchByLetterResponse, isArray: true })
    rows: SearchByLetterResponse;
  }

  export class SearchRequest {
    @ApiProperty({ example: 'а' })
    search: string;
  }

export interface IProductsQuery {
    limit: string;
    offset: string;
    products: string | undefined;
    priceFrom: string | undefined;
    priceTo: string | undefined; 
  }
  
  export interface IProductsFilter {
    model: string | undefined;
    price: { [Op.between]: number[] };
  }