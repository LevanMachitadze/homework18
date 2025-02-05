import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class QueryParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { product, price } = value;

    const products = ['cars', 'phone'];
    if (product && !products.includes(product))
      throw new BadRequestException('wrong category');

    if (price && price <= 0)
      throw new BadRequestException('price is more than 0');
    return value;
  }
}
