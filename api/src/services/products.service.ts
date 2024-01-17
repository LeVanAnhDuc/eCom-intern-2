import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import {
  CreateProductDto,
  GetProductsQueryParams,
  UpdateProductDto,
} from "dto/products.dto";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description,
        active: true,
      },
    });
  }

  async getOne(id: number) {
    const data = await this.prisma.product.findFirst({
      where: { id },
      include: {
        ProductImage: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  async getAll(query: GetProductsQueryParams) {
    const { searchTerm, sortBy, sortType, page, limit, active } = query;
    const where = {
      AND: [{ name: { contains: searchTerm } }, { active }],
    };

    const [totalItem, products] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        orderBy: [
          {
            [sortBy]: sortType,
          },
        ],
        take: limit,
        skip: (page - 1) * limit,
        include: {
          ProductImage: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      }),
    ]);

    return {
      items: products,
      pagination: {
        totalItem,
        currentPage: page,
        limit,
        hasItem: (page - 1) * limit < totalItem,
      },
    };
  }

  async remove(id: number) {
    return await this.prisma.product.update({
      where: { id },
      data: { active: false },
    });
  }

  async update(id: number, dto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description,
        active: dto.active,
      },
    });
  }
}
