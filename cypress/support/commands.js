// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('fillFormComponents', (data = {}) => {
    cy.get('[data-cy-label="form-component"]')
    //get the children 
    .children()
    //iterate trough each label in an array like structure
    //each yield always the the original structure
    .each(element => {
      const elementType = element[0].dataset.cyLabel
      const cyElement = cy.wrap(element)

      switch (
        elementType //eslint-disable-line
      ) {
        case 'form-name': {
          cyElement.setFormName()
          break
        }
        case 'form-email': {
              cyElement.setFormEmail()
              break
        }
        case 'form-notes': {
            cyElement.setFormNotes()
            break
        }
        case 'form-transport': {
            cyElement.setFormTransport()
        break
        }
        case 'form-days': {
            cyElement.setFormDays()
        break
        }
        case 'form-week': {
            cyElement.setFormWeek()
        break
        }
        case 'form-gadget': {
            cyElement.setFormGadget()
        break
        }
        case 'form-yearmodel': {
            cyElement.setFormYear()
        break
        }
        default:
          break
        }
})
})

Cypress.Commands.add(
    'setFormName',
    { prevSubject: true },
    (subject, name = "Donald") => {
      cy.wrap(subject)
        .type(name)
    }
  )
Cypress.Commands.add(
    'setFormEmail',
    { prevSubject: true },
    (subject, email = "donald.lamaj@gmail.com") => {
      cy.wrap(subject)
        .type(email)
    }
  )
Cypress.Commands.add(
    'setFormNotes',
    { prevSubject: true },
    (subject, notes = "Some Notes") => {
      cy.wrap(subject)
        .type(notes)
    }
  )
Cypress.Commands.add(
    'setFormTransport',
    { prevSubject: true },
    (subject, transport = "Car") => {
      cy.wrap(subject)
      .select(transport)
    }
  )
Cypress.Commands.add(
    'setFormDays',
    { prevSubject: true },
    (subject, days = ['Monday','Tuesday']) => {
        cy.wrap(subject)
        cy.get('input[id="myCheckBoxID"]')
        .check(days)
    }
  )
  Cypress.Commands.add(
    'setFormWeek',
    { prevSubject: true },
    (subject, week = "2031-W23") => {
        cy.wrap(subject)
        .type(week)
    }
  )
  Cypress.Commands.add(
    'setFormGadget',
    { prevSubject: true },
    (subject) => {
        cy.wrap(subject)
        cy.get('label[id="mytoggle"]')
        .click()
    }
  )
  Cypress.Commands.add(
    'setFormYear',
    { prevSubject: true },
    (subject) => {
        cy.wrap(subject)
        cy.get('input[type="number"]')
        .invoke('val', 2014)
        .trigger('change')
    }
  )
