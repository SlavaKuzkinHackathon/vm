import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/role/role-auth.decorators';
import { RolesGuard } from 'src/role/role.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';
import { ProductService } from './product.service';
import { FindOneResponse, GetByNameRequest, GetByNameResponse, PaginateAndFilterResponse, SearchRequest, SearchResponse } from './types';

@ApiTags('Товары')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  
  @ApiOkResponse({ type: FindOneResponse })
  @ApiOperation({ summary: 'Получение одного товара' })
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Возвращаются данные товара',
  })
  @ApiResponse({
    status: 404,
    description: 'Товара не существует',
  })
  @Get('find/:id')
  getOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Добавление товара' })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Товар уже существует',
  })
  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<string> {
    return await this.productService.createProduct(createProductDto, image);
  }
 
  @ApiOperation({ summary: 'Получение товаров с пагинацией' })
  @ApiResponse({
    status: 200,
    description: 'Возвращаются пагинация',
  })
  @ApiOkResponse({ type: PaginateAndFilterResponse })
  @Get('all')
  paginateAndFilter(@Query() query) {
    return this.productService.paginateAndFilter(query);
  }
 
  @ApiOperation({ summary: 'Получение всех каталогов' })
  @ApiResponse({
    status: 200,
    type: [Product],
    description: 'Возвращаются все каталоги',
  })
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  } 

  @ApiOperation({ summary: 'Получение популярных товаров' })
  @ApiResponse({
    status: 200,
    description: 'Возвращаются популярные товары',
  })
  @Get('bestsellers')
  async getPopular(): Promise<{ rows: Product[]; count: number } | Product[]> {
    return await this.productService.getPopular();
  }

  @ApiOperation({ summary: 'Получение новинок' })
  @ApiResponse({
    status: 200,
    description: 'Возвращаются новинки',
  })
  @Get('new')
  async getNovelt(): Promise<{ rows: Product[]; count: number } | Product[]> {
    return await this.productService.getNovelty();
  }


  @ApiOkResponse({ type: SearchResponse })
  @ApiBody({ type: SearchRequest })
  @ApiOperation({ summary: 'Поиск по имени' })
  @ApiResponse({
    status: 200,
    description: 'Возвращается поиск по имени',
  })
  @Post('search')
  search(@Body() { search }: { search: string }) {
    return this.productService.searchByString(search);
  }


  @ApiOkResponse({ type: GetByNameResponse })
  @ApiBody({ type: GetByNameRequest })
  @ApiOperation({ summary: 'Получение по имени' })
  @ApiResponse({
    status: 200,
    description: 'Возвращается товар по имени',
  })
  @Post('name')
  getByName(@Body() { name }: { name: string }) {
    return this.productService.findOneByName(name);
  }

  @ApiOperation({ summary: 'Изменение товара' })
  @ApiResponse({
    status: 200,
    description: 'Товар изменен',
  })
  @ApiResponse({
    status: 404,
    description: 'Запрашиваемого товара не существует',
  })
  @Put(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<string> {
    return await this.productService.updateProduct(
      +id,
      updateProductDto,
      image,
    );
  }

  @ApiOperation({ summary: 'Удаление товара' })
  @ApiResponse({
    status: 200,
    description: 'Товар удален',
  })
  @ApiResponse({
    status: 404,
    description: 'Товара не существует',
  })
  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string): Promise<string> {
    return await this.productService.removeProduct(+id);
  }
  
}

