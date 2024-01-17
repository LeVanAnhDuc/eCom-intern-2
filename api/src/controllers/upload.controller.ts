import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { fileConfig } from "file-config";
import { AuthGuard } from "guards/auth.guard";
import { UploadService } from "services/upload.service";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  // @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor("file", fileConfig))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: ".(png|jpeg|jpg)" })],
        fileIsRequired: false,
      })
    )
    file: Express.Multer.File
  ) {
    const url = `localhost:3333/${file.path}`;
    return { url };
  }
}
