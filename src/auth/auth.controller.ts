import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger'; // Import decorator Swagger [cite: 108]
import { AuthService } from './auth.service';

@ApiTags('Auth') // Mengelompokkan endpoint login & register [cite: 111]
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Mendaftarkan user baru ke sistem' })
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user dan menghasilkan JWT token' }) // [cite: 117]
  login(@Body() dto: any) {
    return this.authService.login(dto);
  }
}