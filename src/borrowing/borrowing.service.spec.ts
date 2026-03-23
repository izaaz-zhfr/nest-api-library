import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingService } from './borrowing.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BorrowingService', () => {
  let service: BorrowingService;

  const mockPrisma = {
    borrowing: {
      findMany: jest.fn().mockResolvedValue([]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BorrowingService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<BorrowingService>(BorrowingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all borrowings', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });
});