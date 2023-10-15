import API from '../api'

function createEmployee(data: Employee) {
  return API.post('/employee', data)
}

function getEmployees() {
  return API.get('/employee')
}

function getEmployee(id: string) {
  return API.get(`/employee/${id}`)
}

function updateEmployee(id: string, data: Employee) {
  return API.put(`/employee/${id}`, data)
}

function deleteEmployee(id: string) {
  return API.delete(`/employee/${id}`)
}
export {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployee,
}
