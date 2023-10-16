import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../entity/employee';
import { Employee as EmployeeDTO } from '../../dto'
import { generateGuid } from '../../utils/generateGuid';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  const { guid } = generateGuid()

  const newEmployeeData: EmployeeDTO = {
    color: 'Blue',
    firstName: `EMP-${guid}`,
    lastName: `LN-${guid}`,
    gender: 'Female',
    grossSalary: '1 000 000',
    salutation: 'Mrs',
    employeeNo: `${Date.now()}`
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
      exports: [EmployeeService],
      imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.TYPEORM_HOST || 'localhost',
        port: Number(process.env.TYPEORM_PORT) || 5433,
        username: process.env.TYPEORM_USER,
        password: process.env.TYPEORM_PWD,
        database: process.env.TYPEORM_DB,
        entities: ['src/entity/**/*.{ts,tsx,js,jsx}'],
        migrations: ['src/migration/**/*.{ts,tsx,js,jsx}'],
        subscribers: ['src/subscriber/**/*.{ts,tsx,js,jsx}'],
        synchronize: true,
      }),TypeOrmModule.forFeature([Employee])],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a list of employees', async () => {
    const list = await controller.findAll()
    console.log(list.length)
    expect(Array.isArray(list)).toBe(true)
  })

  it('should create a new employee', async () => {
    const newEmployee = await controller.create(newEmployeeData)
    console.log(newEmployee.firstName, newEmployeeData.firstName)
    expect(newEmployee.firstName).toBe(newEmployeeData.firstName)
  })

  it('should update a new employee', async () => {
    const newEmployee = await controller.update(guid, {
      ...newEmployeeData,
      firstName: `${newEmployeeData.firstName} - Edit`
    })
    console.log(typeof newEmployee)
    expect(typeof newEmployee).toBe('boolean')
  })

  it('should delete employee', async () => {
    const newEmployee = await controller.remove(guid,)
    console.log(newEmployee)
    expect(typeof newEmployee).toBe('boolean')
  })
});
