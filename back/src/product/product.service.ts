import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';
import { FilesService } from 'src/files/files.service';
import { Op } from 'sequelize';
import { IProductsFilter, IProductsQuery } from './types';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,

    private filesService: FilesService,
  ) {}

  async findOne(id: number | string): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async getProducts(
    page: number,
    limit: number,
    sorting?: string,
  ): Promise<{ rows: Product[]; count: number } | Product[]> {
    if (!page || !limit) {
      return await this.productRepository.findAll();
    }
    const offset = page * limit - limit;
    switch (sorting) {
      case 'cheaper':
        return await this.productRepository.findAndCountAll({
          offset,
          limit,
          order: [['price', 'ASC']],
        });
      case 'expensive':
        return await this.productRepository.findAndCountAll({
          offset,
          limit,
          order: [['price', 'DESC']],
        });
      case 'popular':
        return await this.productRepository.findAndCountAll({
          offset,
          limit,
          order: [['rating', 'DESC']],
        });
      default:
        return await this.productRepository.findAndCountAll({
          offset,
          limit,
        });
    }
  }

  /* async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.findAll();

    return products;
  } */

  async getOneProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findByPk(id);

    if (!product) {
      throw new HttpException(
        'Такого товара не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async createProduct(
    createProductDto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<string> {
    const candidateProduct = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });
    if (candidateProduct) {
      throw new HttpException(
        'Такой товар уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    let imageName = '';
    if (image) {
      imageName = await this.filesService.createFile(image);
    }
    const product = await this.productRepository.create({
      ...createProductDto,
      image: imageName,
    });

    return `Товар ${product.name} успешно создан`;
  }

  async getPopular(): Promise<{ rows: Product[]; count: number } | Product[]> {
    const products = await this.productRepository.findAll({
      order: [['rating', 'DESC']],
    });
    return products;
  }

  async getNovelty(): Promise<{ rows: Product[]; count: number } | Product[]> {
    const products = await this.productRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
    return products;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    image: Express.Multer.File,
  ): Promise<string> {
    const product = await this.productRepository.findByPk(id);
    if (!product) {
      throw new HttpException(
        'Запрашиваемого товара не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    let imageName = '';
    if (image) {
      imageName = await this.filesService.updateFile(image, product.image);
    }
    await this.productRepository.update(
      {
        ...updateProductDto,
        image: imageName,
      },
      { where: { id } },
    );
    return `Товар c id=${id} изменен`;
  }

  async removeProduct(id: number): Promise<string> {
    const product = await this.productRepository.findByPk(id);
    if (!product) {
      throw new HttpException(
        `Товара с id=${id} не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.productRepository.destroy({
      where: { id },
    });
    return `Товар ${product.name} с id=${id} удален`;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.findAll();

    return products;
  }

  async paginateAndFilter(
    query: IProductsQuery,
  ): Promise<{ count: number; rows: Product[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    const filter = {} as Partial<IProductsFilter>;

    if (query.priceFrom && query.priceTo) {
      filter.price = {
        [Op.between]: [+query.priceFrom, +query.priceTo],
      };
    }

    if (query.products) {
      filter.model = JSON.parse(decodeURIComponent(query.products));
    }

    return this.productRepository.findAndCountAll({
      limit,
      offset,
      where: filter,
    });
  }

  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: Product[] }> {
    return this.productRepository.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }

  async findOneByName(name: string): Promise<Product> {

    return this.productRepository.findOne({
        where: { name }
    })
}

}
