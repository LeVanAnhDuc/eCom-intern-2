import { Module } from '@nestjs/common';
import { ProductsController } from 'controllers/products.controller';
import { ProductsService } from 'services/products.service';
import { PrismaModule } from './prisma.module';
import { UploadController } from 'controllers/upload.controller';
import { UploadService } from 'services/upload.service';

@Module({
  imports: [PrismaModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
