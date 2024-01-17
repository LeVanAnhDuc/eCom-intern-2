import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  CreateProductDto,
  GetProductsQueryParams,
  UpdateProductDto,
} from "dto/products.dto";
import { AuthGuard } from "guards/auth.guard";
import { ProductImageService } from "services/product-image.service";
import { ProductsService } from "services/products.service";

@Controller("products")
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productImageService: ProductImageService
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateProductDto) {
    const product = await this.productsService.create(dto);
    await this.productImageService.create(dto.images, product.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Query() query: GetProductsQueryParams) {
    return await this.productsService.getAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async getOne(@Param("id") id: string) {
    return await this.productsService.getOne(Number(id));
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return await Promise.all([
      this.productsService.update(Number(id), dto),
      this.productImageService.update(dto.images, Number(id)),
    ]);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.productsService.remove(Number(id));
  }
}
