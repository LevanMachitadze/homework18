import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProducts } from './expenses.interface';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'ford',
      category: 'cars',
      price: 4000,
      createdAt: 'japan',
    },
    {
      id: 2,
      name: 'BMW',
      category: 'cars',
      price: 6000,
      createdAt: 'kutaisi',
    },
    {
      id: 3,
      name: 'pixel',
      category: 'phone',
      price: 1000,
      createdAt: 'canada',
    },
    {
      id: 4,
      name: 'nokia',
      category: 'phone',
      price: 10,
      createdAt: 'zugdidi',
    },
  ];

  private products2 = [
    {
      id: 1,
      name: 'ფორდი',
      category: 'მანქანები',
      price: 4000,
      createdAt: 'იაპონია',
    },
    {
      id: 2,
      name: 'ბმწ',
      category: 'მანქანები',
      price: 6000,
      createdAt: 'მამაქალაქი',
    },
    {
      id: 3,
      name: 'პიხელი',
      category: 'ტელეფონი',
      price: 1000,
      createdAt: 'კანადა',
    },
    {
      id: 4,
      name: 'ნოკია',
      category: 'ტელეფონი',
      price: 10,
      createdAt: 'ზუგდიდი',
    },
  ];

  getAll(query, headers): IProducts[] {
    const { name, category, price, createdAt } = query;
    if (name && category && createdAt && price) {
      const nameFilteredData = this.products.filter((el) => el.name === name);
      const priceFilteredData = nameFilteredData.filter(
        (el) => el.price === +price,
      );
      const categoryFilteredData = nameFilteredData.filter(
        (el) => el.category === category,
      );
      const createdAtFilterData = nameFilteredData.filter(
        (el) => el.createdAt === createdAt,
      );

      return createdAtFilterData;
    }
    if (name) {
      return this.products.filter((el) => el.name === name);
    }
    if (price >= 300) {
      return this.products.filter((el) => el.price <= +price);
    }
    if (category) {
      return this.products.filter((el) => el.category === category);
    }
    if (createdAt) {
      return this.products.filter((el) => el.createdAt === createdAt);
    }

    // if (!headers.password || headers.password !== 'titushka')
    //   throw new BadRequestException('permition dined');

    return this.products;
  }
  getById(id: number) {
    const product = this.products.find((el) => el.id === id);
    if (!product) throw new NotFoundException('product not found');
    return product;
  }
  createProduct(body) {
    const { name, category, price, createdAt } = body;
    if (!name || !category || !price || !createdAt)
      throw new BadRequestException(
        'name, category, price and createdAt is required',
      );
    const lastId = this.products[this.products.length - 1]?.id || 0;
    const newProduct = {
      id: lastId + 1,
      name,
      category,
      price,
      createdAt,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  deleteProduct(id: number) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException('user not found');

    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct;
  }
  updateProduct(id: number, updateProduct) {
    const index = this.products.findIndex((el) => el.id === +id);
    if (index === -1) throw new NotFoundException('user not found');
    this.products[index] = { ...this.products[index], ...updateProduct };
    return this.products[index];
  }

  translateProducts(lang: string) {
    const products = {
      ka: this.products2.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        createdAt: product.createdAt,
      })),
      en: this.products.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        createdAt: product.createdAt,
      })),
    };
    return products[lang] || products['en'];
  }
}
