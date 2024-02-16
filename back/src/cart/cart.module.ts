import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './cart.model';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart]),
    UserModule,
    ProductModule,
    TokenModule
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}