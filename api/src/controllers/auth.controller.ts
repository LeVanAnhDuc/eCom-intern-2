import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto } from 'dto/auth.dto';
import { AuthService } from 'services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('users')
  async signinUser(@Body() dto: SigninDto) {
    return await this.authService.signinUser(dto);
  }
}
