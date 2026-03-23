import { IsString, IsOptional } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  kelas?: string;

  @IsString()
  @IsOptional()
  jurusan?: string;
}
