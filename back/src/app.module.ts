import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { Role } from './role/models/role.model';
import { UserRole } from './role/models/user-role.model';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { Token } from './token/token.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Cart } from './cart/cart.model';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      dialectOptions: {
        ssl: true,
        native:true
      },
      models: [
        User,
        Product,
        Role,
        UserRole,
        Token,
        Cart,
      ],
      autoLoadModels: true,
      sync: { alter: true },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/static'),
    }),
    UserModule,
    ProductModule,
    AuthModule,
    TokenModule,
    FilesModule,
    CartModule,
    PaymentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
