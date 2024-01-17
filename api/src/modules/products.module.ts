import { Module } from "@nestjs/common";
import { ProductsController } from "controllers/products.controller";
import { ProductsService } from "services/products.service";
import { PrismaModule } from "./prisma.module";
import { ProductImageService } from "services/product-image.service";

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductImageService],
})
export class ProductsModule {}
