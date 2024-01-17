import { Injectable } from '@nestjs/common';
import { SigninDto } from 'dto/auth.dto';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signinUser(dto: SigninDto) {
    const { username, password } = dto;
    const user = await this.userService.signIn(username, password);
    return {
      accessToken: await this.jwtService.signAsync({
        username: user.username,
        id: user.id,
      }),
    };
  }
}
