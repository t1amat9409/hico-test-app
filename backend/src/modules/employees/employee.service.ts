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
    const results = await this.employeeRepo.find({
      where: {
        isActive: true,
      },
    });
    return results;
  }

  async create(data: EmployeeDTO) {
    const { guid } = generateGuid();
    let employeeNo: string = data.employeeNo;
    const employeeWithEmpNo = await this.getOneByEmployeeNo(data.employeeNo);
    if (employeeWithEmpNo) {
      employeeNo = await this.getNextEmployeeNumber();
    }
    const newEmployee = await this.employeeRepo.create({
      ...data,
      guid,
      employeeNo,
    });
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
      console.log(existing);
      return true;
    }
    return false;
  }

  async remove(guid: string) {
    const existing = await this.getOneByGUID(guid);
    if (existing) {
      existing.isActive = false;
      await this.employeeRepo.save(existing);
      console.log(existing);
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

  async getEmployeeNumbers() {
    const employees = await this.employeeRepo.find();
    const emplNos = employees
      .filter((e) => e.employeeNo.length <= 5)
      .map((e) => Number(e.employeeNo));
    return emplNos;
  }

  async getNextEmployeeNumber() {
    const employeeNumbers = await this.getEmployeeNumbers();
    const emplNos = employeeNumbers.sort((a, b) => b - a)[0] ?? 0;
    return `${emplNos + 1}`.padStart(5, '0');
  }
}
