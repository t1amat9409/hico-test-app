import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { Base } from './base';
import { EmployeeColor, EmployeeGender, EmployeeSalutation } from 'src/dto';

@Entity({
  name: 'employees'
})
export class Employee extends Base {
  @Index()
  @PrimaryColumn({ type: 'uuid' })
  guid: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  employeeNo: string;

  @Column({
    enum: ['Dr', 'Mr', 'Mrs', 'Mx'] as unknown as EmployeeSalutation,
    default: 'Mr',
  })
  salutation: EmployeeSalutation;

  @Column({
    enum: ['Male', 'Female', 'Unspecified'] as unknown as EmployeeGender,
    default: 'Male',
  })
  gender: EmployeeGender;

  @Column()
  grossSalary: string;

  @Column({
    enum: ['Green', 'Red', 'Blue', 'Default'] as unknown as EmployeeColor,
    default: 'Default',
  })
  color: EmployeeColor;
}
