import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { QueryParamsPipe } from './pipes/query.pipes';
import { UpdateProduct } from './dtos/update-users.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getAll(
    @Query(new QueryParamsPipe()) query,
    @Body() body,
    @Headers() headers,
  ) {
    return this.productService.getAll(query, headers);
  }

  @Get('translated')
  translateProducts(@Query('lang', new DefaultValuePipe('en')) lang) {
    return this.productService.translateProducts(lang);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id) {
    return this.productService.getById(id);
  }
  @Post()
  createProduct(@Body() body) {
    return this.productService.createProduct(body);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id) {
    return this.productService.deleteProduct(+id);
  }
  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id,
    @Body() updateProduct: UpdateProduct,
  ) {
    return this.productService.updateProduct(+id, updateProduct);
  }
}
