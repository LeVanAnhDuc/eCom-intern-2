import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsEnum,
  IsBoolean,
  Max,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  active = true;


  @IsArray()
  @IsString({ each: true })
  images: string[] = [];
}

export class UpdateProductDto extends CreateProductDto {}

enum SortBy {
  Price = 'price',
  Name = 'name',
  CreateAt = 'createdAt',
}

enum SortType {
  Asc = 'asc',
  Desc = 'desc',
}

export class GetProductsQueryParams {
  @IsString()
  searchTerm = '';

  @IsInt()
  @Type(() => Number)
  page = 1;

  @IsInt()
  @Max(120)
  @Type(() => Number)
  limit = 12;

  @IsEnum(SortBy)
  sortBy = SortBy.CreateAt;

  @IsEnum(SortType)
  sortType = SortType.Asc;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  active = true;
}
