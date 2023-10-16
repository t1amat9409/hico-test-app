import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../entity/employee';
import { Repository } from 'typeorm';
import { Employee as EmployeeDTO } from '../../dto';
import { generateGuid } from '../../utils/generateGuid';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async getAll() {
    const results = await this.employeeRepo.find({});
    return results;
  }

  async create(data: EmployeeDTO) {
    const { guid } = generateGuid()
    const newEmployee = await this.employeeRepo.create({...data, guid});
    newEmployee.isActive = true;
    await this.employeeRepo.save(newEmployee);
    return newEmployee;
  }

  async update(guid: string, data: EmployeeDTO) {
    const existing = await this.getOneByGUID(guid);
    if (existing) {
      Object.keys(data).forEach((key) => {
        if (existing[key]) {
          existing[key] = data[key];
        }
      });
      existing.isActive = true;
      await this.employeeRepo.save(existing);
      return true;
    }
    return false;
  }

  async remove(guid: string) {
    const existing = await this.getOneByGUID(guid);
    if (existing) {
      existing.isActive = true;
      await this.employeeRepo.save(existing);
      return true;
    }

    return false;
  }

  async getOneByEmployeeNo(employeeNo: string) {
    const employee = await this.employeeRepo.findOne({
      where: {
        employeeNo,
      },
    });

    return employee;
  }

  async getOneByGUID(guid: string) {
    const employee = await this.employeeRepo.findOne({
      where: {
        guid,
      },
    });

    return employee;
  }
}
