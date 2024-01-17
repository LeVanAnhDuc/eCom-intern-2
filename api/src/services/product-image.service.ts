import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ProductImageService {
  constructor(private prisma: PrismaService) {}
  async create(images: string[], productId: number) {
    if (images.length === 0) return;
    const data = images.map((img) => ({ url: img, productId }));
    return await this.prisma.productImage.createMany({ data });
  }

  async getAll(productId: number) {
    return await this.prisma.productImage.findMany({ where: { productId } });
  }

  async remove(id: number) {
    return await this.prisma.productImage.delete({ where: { id } });
  }

  async update(images: string[], productId: number) {
    await this.prisma.productImage.deleteMany({
      where: { productId },
    });
    return await this.create(images, productId);
  }
}
