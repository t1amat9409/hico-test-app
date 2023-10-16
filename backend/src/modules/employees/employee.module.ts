import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../entity/employee';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
  imports: [TypeOrmModule.forFeature([Employee])],
})
export class EmployeeModule {}
