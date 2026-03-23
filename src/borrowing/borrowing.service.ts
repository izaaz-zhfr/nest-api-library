import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';

@Injectable()
export class BorrowingService {
  constructor(private prisma: PrismaService) {}

  // 📖 GET ALL
  async findAll() {
    return this.prisma.borrowing.findMany({
      include: {
        member: true,
        book: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // 🔥 PINJAM BUKU
  async create(dto: CreateBorrowingDto) {
    const book = await this.prisma.book.findUnique({
      where: { id: dto.bookId },
    });

    if (!book) throw new NotFoundException('Book not found');

    const member = await this.prisma.member.findUnique({
      where: { id: dto.memberId },
    });

    if (!member) throw new NotFoundException('Member not found');

    return this.prisma.borrowing.create({
      data: {
        bookId: dto.bookId,
        memberId: dto.memberId,
      },
    });
  }

  // 🔄 RETURN BUKU
  async returnBook(id: number) {
    const borrowing = await this.prisma.borrowing.findUnique({
      where: { id },
    });

    if (!borrowing) throw new NotFoundException('Data not found');

    return this.prisma.borrowing.update({
      where: { id },
      data: {
        returnDate: new Date(),
      },
    });
  }
}