import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Employee } from 'src/dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeSercvice: EmployeeService) {}

  @Post()
  async create(@Body() employee: Employee) {
    const newEmployee = await this.employeeSercvice.create(employee);
    return newEmployee;
  }

  @Get()
  async findAll() {
    return await this.employeeSercvice.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const newEmployee = await this.employeeSercvice.getOneByGUID(id);
    return newEmployee;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() employee: Employee) {
    const updated = await this.employeeSercvice.update(id, employee);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const updated = await this.employeeSercvice.remove(id);
    return updated;
  }
}
