import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    // Mengubah register menjadi registerAsync sesuai modul [cite: 152]
    JwtModule.registerAsync({
      useFactory: () => ({
        signOptions: { expiresIn: '1d' },
        // Mengambil secret key dari environment variable 
        secret: process.env.JWT_SECRET, 
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}