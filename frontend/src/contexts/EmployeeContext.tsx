import * as React from 'react'
import { createEmployee, getEmployees, updateEmployee, deleteEmployee } from '../services/employee';

interface EmployeeContextData {
  employeeList: Employee[];
  saveOrUpdateEmployee(employee: Employee): Promise<void>;
  removeEmployee(employee: Employee): Promise<void>;
  loading: boolean;
  nextEmployeeNo: string;
  selectedEmployee: Employee | undefined;
  onEmployeeSelected(employee?: Employee): void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  showForm: boolean;
}
export const EmployeeContext = React.createContext({} as EmployeeContextData)

export const EmployeeProvider = ({ children }: { children: React.ReactNode }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [employeeList, updateEmployeeList] = React.useState<Employee[]>([])
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | undefined>(undefined)
  const [loading, setLoading] = React.useState<boolean>(false)
  async function saveOrUpdateEmployee(employee: Employee) {
    setLoading(true)
    if (employee.guid) {
      const { guid, ...body} = employee
      updateEmployee(guid, body).then((res) => {
        if (!res.data) {
          alert('Error something went wrong, please save again!')
        }
        getAll()
      }).catch((e) => {
        setLoading(false)
        alert(e.message)
      })
    } else {
      createEmployee(employee).then((res) => {
        if (res.data) {
          setSelectedEmployee(res.data as Employee)
        } else {
          alert('Error something went wrong, please save again!')
        }
        getAll()
      }).catch((e) => {
        setLoading(false)
        alert(e.message)
      })
    }
  }
  async function removeEmployee(employee: Employee) {
    if (!employee.guid) return
    setLoading(true)
    deleteEmployee(employee.guid).then((res) => {
      getAll()
      if (res.data) {
        setSelectedEmployee(undefined)
        setShowForm(false)
      }
    }).catch((e) => {
      setLoading(false)
      alert(e.messsage)
    })
  }

  function getAll() {
    getEmployees().then((res) => {
      const data = res.data as Employee[]
      updateEmployeeList(data)
      setLoading(false)
    }).catch((e) => {
      setLoading(false)
      alert(e.message)
    })
  }
  const nextEmployeeNo = React.useMemo(() => {
    return `${employeeList.length + 1}`.padStart(5, '0')
  }, [employeeList])

  React.useEffect(() => {
    getAll()
  }, [])

  return (
    <EmployeeContext.Provider value={{
      employeeList,
      loading,
      removeEmployee,
      saveOrUpdateEmployee,
      nextEmployeeNo,
      selectedEmployee,
      onEmployeeSelected(employee?: Employee) {
        if (employee) setShowForm(true)
        setSelectedEmployee(employee)
      },
      setShowForm,
      showForm,
    }}>
      {children}
    </EmployeeContext.Provider>
  )
}
