interface Employee {
  guid?: string
  firstName: string
  lastName: string
  employeeNo: string
  salutation: EmployeeSalutation
  gender: EmployeeGender
  grossSalary: string,
  color: EmployeeColor
}

type EmployeeSalutation = 'Dr' | 'Mr' | 'Mrs' | 'Mx'
type EmployeeGender = 'Male' | 'Female' | 'Unspecified'
type EmployeeColor = 'Green' | 'Red' | 'Blue' | 'Default'
