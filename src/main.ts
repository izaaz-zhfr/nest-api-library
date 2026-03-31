import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 1. Tambahkan ini agar aplikasi bisa diakses dari network luar container
  app.enableCors(); 

  app.useGlobalPipes(new ValidationPipe());

  // Konfigurasi Metadata Dokumentasi
  const config = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('Backend API Sistem Perpustakaan')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  // 2. UBAH BARIS INI: Gunakan process.env.PORT
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); 
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();