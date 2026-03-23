import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { AppService } from '../src/app.service';

const prisma = new PrismaClient();
@Global()
@Module({
  providers: [PrismaService, AppService],
  exports: [PrismaService],
})
export class PrismaModule {}
    