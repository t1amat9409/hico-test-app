import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import * as React from 'react';

import { maskCurrency } from '../utils';
import { useEmployeeContext } from '../hooks/useEmployeeContext';

interface EmployeeFormProps {
  onCancel(): void
  employee?: Employee
}
export const EmployeeForm = ({
  onCancel,
  employee: initEmployee
}: EmployeeFormProps) => {
  const { nextEmployeeNo, saveOrUpdateEmployee, selectedEmployee, removeEmployee } = useEmployeeContext()

  const [employee, updateEmployee] = React.useState<Employee>({
    employeeNo: initEmployee?.employeeNo ?? '',
    firstName: initEmployee?.firstName ?? '',
    lastName: initEmployee?.lastName ?? '',
    salutation: initEmployee?.salutation ?? 'Mr',
    gender: initEmployee?.gender ?? 'Male',
    grossSalary: initEmployee?.grossSalary ?? '',
    color: initEmployee?.color ?? 'Default'
  })

  const [errors, setErrors] = React.useState<Record<keyof Employee, boolean>>({
    color: false,
    employeeNo: false,
    firstName: false,
    guid: false,
    gender: false,
    grossSalary: false,
    lastName: false,
    salutation: false
  })

  const salutations: EmployeeSalutation[] = ['Dr', 'Mr', 'Mrs', 'Mx']

  const genders: EmployeeGender[] = ['Male', 'Female', 'Unspecified']

  const colors: EmployeeColor[] = ['Green', 'Blue', 'Red', 'Default']

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    updateEmployee({
      ...employee,
      [name]: name === 'grossSalary' ? maskCurrency(value) : value
    })
    setErrors({
      ...errors,
      [name]: !value || value.length === 0 ? true : false,
    })
  }

  function handleSelectChange(event: SelectChangeEvent) {
    const salutation: EmployeeSalutation = event.target.value as EmployeeSalutation
    updateEmployee({
      ...employee,
      salutation,
      gender: salutation === 'Mr' ? 'Male' : salutation === 'Mrs' ? 'Female' : employee.gender
    })

    setErrors({
      ...errors,
      salutation: false,
      gender: false,
    })
  };

  function handleGenderChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateEmployee({
      ...employee,
      gender: (event.target as HTMLInputElement).value as EmployeeGender
    });

    setErrors({
      ...errors,
      gender: false,
    })
  };

  function handleColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateEmployee({
      ...employee,
      color: (event.target as HTMLInputElement).value as EmployeeColor
    });
    setErrors({
      ...errors,
      color: false,
    })
  };

  function saveEmployee() {
    const fieldErrors: Record<string, boolean> = {}
    Object.keys(employee).forEach((key) => {
      if (key && !['guid', 'employeeNo'].includes(key)) {
        setErrors({
          ...errors,
          [key]: employee[key as keyof Employee]?.length === 0 ? true : false
        })
        fieldErrors[key] = employee[key as keyof Employee]?.length === 0 ? true : false
      }
    })
    const hasErrors = Object.keys(fieldErrors).some((k) => fieldErrors[k])
    if (hasErrors) {
      alert('All fields are required!')
    } else {
      saveOrUpdateEmployee({
        ...employee,
        employeeNo: !selectedEmployee ? nextEmployeeNo : selectedEmployee.employeeNo
      })
    }
  }

  React.useEffect(() => {
    if (!selectedEmployee) {
      updateEmployee({
        ...employee,
        employeeNo: nextEmployeeNo,
      })
    }
  }, [selectedEmployee, nextEmployeeNo, employee])

  React.useEffect(() => {
    if (selectedEmployee) {
      updateEmployee(selectedEmployee)
    } else {
      updateEmployee({
        employeeNo: nextEmployeeNo,
        firstName: '',
        lastName: '',
        salutation: 'Mr',
        gender: 'Male',
        grossSalary: '',
        color: 'Default'
      })
    }
  }, [selectedEmployee])

  return (
    <Box sx={{
      border: '1px solid #ddd',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      px: 2,
      py: 1
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <Typography variant='body1' sx={{
          textAlign: 'center',
          flex: 1,
        }}>Empoyee Information</Typography>
        <Button data-cy="employeeFormCancel" size='small' onClick={onCancel}>Cancel</Button>
        <Button data-cy="employeeFormSave" size='small' onClick={saveEmployee} variant='contained' color={employee.color === 'Blue' ? 'info' : employee.color === 'Green' ? 'success' : employee.color === 'Red' ? 'error' : 'primary'} sx={{
          ml: 1
        }}>Save</Button>
      </Box>

      <Box sx={{
        display: 'flex',
        flex: 1,
        overflowY: 'auto',
        pt: 1,
      }}>
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            name="firstName"
            data-cy="employeeFormName"
            error={errors.firstName}
            value={employee.firstName}
            onChange={handleChange}
            sx={{
              mb: 1
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            name="lastName"
            data-cy="employeeFormSurname"
            value={employee.lastName}
            error={errors.lastName}
            onChange={handleChange}
            sx={{
              mb: 1
            }}
          />
          <FormControl fullWidth
            sx={{
              mb: 1
            }}>
            <InputLabel id="saluation-label">Salutation</InputLabel>
            <Select
              labelId="saluation-label"
              id="saluation"
              value={employee.salutation}
              data-cy="employeeFormSalutation"
              label="Salutation"
              error={errors.salutation}
              onChange={handleSelectChange}
            >
              {salutations.map((e) => <MenuItem data-cy={`employeeFormSalute${e}`} key={e} value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl
            error={errors.gender}>
            <FormLabel id="gender-rd-buttons-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender-rd-buttons-label"
              name="gender-rd-buttons"
              value={employee.gender}
              onChange={handleGenderChange}
            >
              {genders.map((e) => {
                return (
                  <FormControlLabel key={e} value={e} control={<Radio
                    data-cy={`employeeFormGender${e}`} />} label={e} />
                )
              })}
            </RadioGroup>
          </FormControl>
          <TextField
            required
            id="outlined-required"
            label="Employee No"
            disabled
            name="employeeNo"
            value={employee.employeeNo}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          pl: 2
        }}>
          <TextField
            required
            id="outlined-required"
            label="Full Name"
            name="fullName"
            disabled
            value={`${employee.firstName} ${employee.lastName}`}
            sx={{
              mb: 1
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Gross Salary $PY"
            name="grossSalary"
            data-cy={`employeeFormGrossSalary`}
            type='text'
            value={employee.grossSalary}
            error={errors.grossSalary}
            onChange={handleChange}
            sx={{
              mb: 1
            }}
          />
          <FormControl error={errors.color}>
            <FormLabel id="color-rd-buttons-label">Employee Profile Color</FormLabel>
            <RadioGroup
              row
              aria-labelledby="color-rd-buttons-label"
              name="color-rd-buttons"
              value={employee.color}
              onChange={handleColorChange}
            >
              {colors.map((e) => {
                return (
                  <FormControlLabel key={e} value={e} control={<Radio data-cy={`employeeFormColor${e}`} />} label={e} />
                )
              })}
            </RadioGroup>
          </FormControl>
          {selectedEmployee && <Button data-cy="employeeFormDelete" size='small' variant='contained' color='error' onClick={() => {
            const cnfm = window.confirm('Are you sure you want to delete this employee data?')
            if (cnfm) {
              removeEmployee(selectedEmployee)
            }
          }}>Delete</Button>}
        </Box>
      </Box>
    </Box>
  )
}
