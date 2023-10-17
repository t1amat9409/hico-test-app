/// <reference types="cypress" />
/// <reference types="../../src/" />
const guid = Date.now()

const newEmployee: Employee = {
  color: 'Blue',
  firstName: `EMP-${guid}`,
  lastName: `LN-${guid}`,
  gender: 'Female',
  grossSalary: '1 000 000',
  salutation: 'Mrs',
  employeeNo: `${guid}`
}

describe('Test Employee UI and API', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Create Employee', () => {
    cy.get('[data-cy=employeeAddForm]').click({ force: true })
    cy.get('p').contains('Empoyee Information').should('exist')

    // start filling in the employee form

    cy.get('[data-cy=employeeFormName] input').type(newEmployee.firstName, {
      force: true,
    })

    cy.get('[data-cy=employeeFormSurname] input').type(newEmployee.lastName, {
      force: true,
    })

    cy.get('[data-cy=employeeFormGrossSalary] input').type(newEmployee.grossSalary, {
      force: true,
    })

    cy.get('[data-cy=employeeFormSave]').click({ force: true })

    cy.wait(1000)

    cy.get('[data-cy=employeeFormCancel]').click({ force: true })

    cy.get('[data-cy=employeeListItem]').contains(newEmployee.firstName).should('exist')
  })

  it('Update Employee', () => {
    cy.get('[data-cy=employeeListItem]').contains(newEmployee.firstName).click({ force: true })
    cy.get('p').contains('Empoyee Information').should('exist')

    // start filling in the employee form

    cy.get('[data-cy=employeeFormName] input').type(` - Edit`, {
      force: true,
    })

    cy.get('[data-cy=employeeFormSave]').click({ force: true })

    cy.wait(1000)

    cy.get('[data-cy=employeeFormCancel]').click({ force: true })

    cy.get('[data-cy=employeeListItem]').contains(`${newEmployee.firstName} - Edit`).should('exist')

  })

  it('Delete Employee', () => {
    cy.get('[data-cy=employeeListItem]').contains(newEmployee.firstName).click({ force: true })
    cy.get('p').contains('Empoyee Information').should('exist')

    cy.get('[data-cy=employeeFormDelete]').click({ force: true })

    cy.window().then((win) =>
      cy.stub(win, 'confirm').as('confirm').returns(true),
    )

    cy.wait(1000)

    cy.get('[data-cy=employeeListItem]').contains(`${newEmployee.firstName} - Edit`).should('not.exist')

  })
})
