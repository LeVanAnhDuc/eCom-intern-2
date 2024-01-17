import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "modules/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ProductsModule } from "modules/products.module";
import { PrismaModule } from "modules/prisma.module";
import { UploadModule } from "modules/upload.module";
import { UsersModule } from "modules/users.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ProductsModule,
    PrismaModule,
    UploadModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
