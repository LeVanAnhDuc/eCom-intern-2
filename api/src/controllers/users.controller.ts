import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "dto/users.dto";
import { UsersService } from "services/users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    await this.userService.create(dto);
  }
}
