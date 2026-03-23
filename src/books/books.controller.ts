import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBearerAuth 
} from '@nestjs/swagger'; // Tambah import ini [cite: 74]
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Books') // Kelompokkan ke folder 'Books' di Swagger [cite: 79, 96]
@ApiBearerAuth() // Aktifkan tombol gembok (Authorize) untuk JWT [cite: 80, 101]
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Roles('ADMIN', 'PETUGAS')
  @Post()
  @ApiOperation({ summary: 'Menambahkan buku baru (ADMIN & PETUGAS only)' }) // [cite: 91, 98]
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Roles('ADMIN', 'PETUGAS', 'MEMBER')
  @Get()
  @ApiOperation({ summary: 'Menampilkan seluruh data buku' }) // [cite: 84]
  findAll() {
    return this.booksService.findAll();
  }

  @Roles('ADMIN', 'PETUGAS', 'MEMBER')
  @Get(':id')
  @ApiOperation({ summary: 'Melihat detail satu buku berdasarkan ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Roles('ADMIN', 'PETUGAS')
  @Put(':id')
  @ApiOperation({ summary: 'Mengubah data buku (ADMIN & PETUGAS only)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
    return this.booksService.update(id, dto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus buku dari sistem (ADMIN ONLY)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}