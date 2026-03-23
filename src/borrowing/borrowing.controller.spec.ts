import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingController } from './borrowing.controller';
import { BorrowingService } from './borrowing.service';

describe('BorrowingController', () => {
  let controller: BorrowingController;

  const mockBorrowingService = {
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn(),
    returnBook: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowingController],
      providers: [
        {
          provide: BorrowingService,
          useValue: mockBorrowingService,
        },
      ],
    }).compile();

    controller = module.get<BorrowingController>(BorrowingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all borrowings', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([]);
  });
});