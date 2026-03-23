import { Controller, Get, Post, Body, Put, Param, UseGuards } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBearerAuth 
} from '@nestjs/swagger'; // Import decorator Swagger
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Import Guard dari Modul 6

@ApiTags('Borrowing') // Mengelompokkan ke kategori 'Borrowing' di Swagger [cite: 79, 96]
@ApiBearerAuth()     // Menampilkan tombol gembok untuk Token JWT [cite: 80, 100]
@UseGuards(JwtAuthGuard) // Memastikan hanya yang login yang bisa akses [cite: 88]
@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Get()
  @ApiOperation({ summary: 'Melihat riwayat semua peminjaman buku' }) // Deskripsi [cite: 84, 97]
  findAll() {
    return this.borrowingService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Melakukan peminjaman buku baru' })
  create(@Body() dto: CreateBorrowingDto) {
    return this.borrowingService.create(dto);
  }

  @Put(':id/return')
  @ApiOperation({ summary: 'Proses pengembalian buku berdasarkan ID peminjaman' })
  returnBook(@Param('id') id: string) {
    return this.borrowingService.returnBook(+id);
  }
}