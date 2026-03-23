import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Tambah ini [cite: 135]
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Tambahkan ConfigModule di baris paling atas imports [cite: 138]
    ConfigModule.forRoot({
      isGlobal: true, // Biar env bisa dipake di semua module tanpa import lagi [cite: 139, 149]
      envFilePath: process.env.NODE_ENV === 'production' 
        ? '.env.production' 
        : '.env', // Pilih file .env berdasarkan environtment [cite: 140, 141, 142, 143]
    }),
    PrismaModule, 
    StudentsModule, 
    BooksModule, 
    MembersModule, 
    BorrowingModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}