import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { isValidPassword } from "utils/hashing";

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}
    
}
