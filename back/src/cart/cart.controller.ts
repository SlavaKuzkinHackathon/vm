import {
    Controller,
    Get,
    Param,
    UseGuards,
    Post,
    Body,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { AddToCartDto } from './dto/add-to-cart.dto';
  import { CartService } from './cart.service';
  import { ApiOkResponse, ApiBody } from '@nestjs/swagger';
  import {
    AddToCardResponse,
    GetAllResponse,
    TotalPriceRequest,
    TotalPriceResponse,
    UpdateCountRequest,
    UpdateCountResponse,
  } from './types';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role-auth.decorators';
  
  @Controller('shopping-cart')
  export class CartController {
    constructor(private readonly cartService: CartService) {}
  
    @ApiOkResponse({ type: [GetAllResponse] })
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get(':id')
    getAll(@Param('id') userId: string) {
      return this.cartService.findAll(userId);
    }
  
    @ApiOkResponse({ type: AddToCardResponse })
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/add')
    addToCar(@Body() addToCartDto: AddToCartDto) {
      return this.cartService.add(addToCartDto);
    }
  
    @ApiOkResponse({ type: UpdateCountResponse })
    @ApiBody({ type: UpdateCountRequest })
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Patch('/count/:id')
    updateCount(
      @Body() { count }: { count: number },
      @Param('id') productId: string,
    ) {
      return this.cartService.updateCount(count, productId);
    }
  
    @ApiOkResponse({ type: TotalPriceResponse })
    @ApiBody({ type: TotalPriceRequest })
    @UseGuards(RolesGuard)
    @Roles('USER')
    @Patch('/total-price/:id')
    updateTotalPrice(
      @Body() { total_price }: { total_price: number },
      @Param('id') productId: string,
    ) {
      return this.cartService.updateTotalPrice(total_price, productId);
    }
  
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Delete('/one/:id')
    removeOne(@Param('id') productId: string) {
      return this.cartService.remove(productId);
    }
  
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Delete('/all/:id')
    removeAll(@Param('id') userId: string) {
      return this.cartService.removeAll(userId);
    }
  }