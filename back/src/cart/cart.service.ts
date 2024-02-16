import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Cart } from './cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async findAll(userId: number | string): Promise<Cart[]> {
    return this.cartModel.findAll({ where: { userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new Cart();
    const user = await this.userService.findOne({
      where: { name: addToCartDto.name },
    });
    const product = await this.productService.findOne(addToCartDto.productId);

    cart.userId = user.id;
    cart.productId = product.id;
    cart.model = product.model;
    cart.price = product.price;
    cart.in_stock = product.in_stock;
    cart.image = product.image;
    cart.name = product.name;
    cart.total_price = product.price;

    return cart.save();
  }

  async updateCount(
    count: number,
    productId: number | string,
  ): Promise<{ count: number }> {
    await this.cartModel.update({ count }, { where: { productId } });

    const product = await this.cartModel.findOne({ where: { productId } });

    return { count: product.count };
  }

  async updateTotalPrice(
    total_price: number,
    productId: number | string,
  ): Promise<{ total_price: number }> {
    await this.cartModel.update({ total_price }, { where: { productId } });

    const product = await this.cartModel.findOne({ where: { productId } });

    return { total_price: product.total_price };
  }

  async remove(productId: number | string): Promise<void> {
    const product = await this.cartModel.findOne({ where: { productId } });

    await product.destroy();
  }

  async removeAll(userId: number | string): Promise<void> {
    await this.cartModel.destroy({ where: { userId } });
  }
}
