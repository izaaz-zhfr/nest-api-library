import { IsInt } from 'class-validator';

export class CreateBorrowingDto {
  @IsInt()
  bookId: number;

  @IsInt()
  memberId: number;
}