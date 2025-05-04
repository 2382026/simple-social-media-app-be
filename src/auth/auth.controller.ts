import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';  // Changed from RegisterDTO to RegisterDto
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {  // Changed from LoginDTO to LoginDto
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {  // Changed from RegisterDTO to RegisterDto
    return this.authService.register(registerDto);
  }
}
