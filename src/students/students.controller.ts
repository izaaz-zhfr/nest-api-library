import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBearerAuth 
} from '@nestjs/swagger'; // Import decorator Swagger [cite: 74]
import { StudentsService } from './students.service';
import { CreateStudentDto } from './create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Import Guard dari Modul 6 [cite: 75]

@ApiTags('Students') // Mengelompokkan ke kategori 'Students' di UI Swagger [cite: 79, 96]
@ApiBearerAuth()     // Menampilkan tombol gembok untuk input Token JWT [cite: 80, 100]
@UseGuards(JwtAuthGuard) // Mengamankan semua endpoint siswa dengan JWT [cite: 88, 179]
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Menambahkan data siswa baru' }) // Deskripsi endpoint [cite: 84, 97]
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Menampilkan seluruh daftar siswa' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail satu siswa berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mengubah data siswa berdasarkan ID' })
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus data siswa dari sistem' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}