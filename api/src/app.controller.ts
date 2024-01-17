import { PrismaService } from 'services/prisma.service';
import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { hashPassword } from 'utils/hashing';
import { faker } from '@faker-js/faker';

const createArr = (lenght: number) => Array.from(Array(lenght).keys());

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('seeds')
  async seeds() {
    await this.prismaService.user.create({
      data: {
        username: 'admin',
        password: await hashPassword('123456'),
        email: 'admin123@gmail.com',
        fullname: 'alex nguyen',
      },
    });

    const products = createArr(400).map(() => ({
      name: faker.commerce.productName(),
      price: faker.datatype.number({ min: 10, max: 2000 }),
      description: faker.commerce.productDescription(),
      active: faker.datatype.boolean(),
    }));

    await this.prismaService.product.createMany({ data: products });
  }
}
