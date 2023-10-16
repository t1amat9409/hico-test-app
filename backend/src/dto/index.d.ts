export interface Employee {
  firstName: string;
  lastName: string;
  employeeNo: string;
  salutation: EmployeeSalutation;
  gender: EmployeeGender;
  grossSalary: string;
  color: EmployeeColor;
}

export type EmployeeSalutation = 'Dr' | 'Mr' | 'Mrs' | 'Mx';
export type EmployeeGender = 'Male' | 'Female' | 'Unspecified';
export type EmployeeColor = 'Green' | 'Red' | 'Blue' | 'Default';
