import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/:productId')
  findOne(@Param('productId', ParseIntPipe) id: string) {
    return {
      message: `Product ${id}`,
    };
  }
}
