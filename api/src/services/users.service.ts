import {
  Injectable,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { hashPassword, isValidPassword } from "utils/hashing";
import { CreateUserDto } from "dto/users.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async signIn(username: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { username } });
    if (!user) {
      throw new NotFoundException();
    }
    const valid = await isValidPassword(password, user.password);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async create(dto: CreateUserDto) {
    const password = await hashPassword(dto.password);
    const availabeUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: dto.username }, { email: dto.email }],
      },
    });
    if (availabeUser) {
      throw new NotImplementedException();
    } else {
      return await this.prisma.user.create({ data: { ...dto, password } });
    }
  }
}
