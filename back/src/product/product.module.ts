import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductController } from './product.controller';
import { Product } from './models/product.model';
import { ProductService } from './product.service';
import { FilesModule } from 'src/files/files.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    FilesModule,
    TokenModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
