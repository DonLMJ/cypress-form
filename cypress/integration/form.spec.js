import * as form from '../po/form_page'
import * as helpers from '../support/helpers'

context("zoom in - test each form component", () => {
    beforeEach(() => {
        // Cypress starts out with a blank state for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit("/");
        cy.get("form");
      })
    it("the title should be Flexifarm", () => { 
        cy.get('title').should('contain', 'Flexifarm')
      })
    it("h1 should be Moneyfarm Attendance Form", () => { 
        cy.get('h1').should('contain', 'Moneyfarm attendance form')
      })
    it("can type the name correctly in Name input field", () => {
        cy.get('input[name="name"]')
          .type(helpers.user().Name)
          .should("have.value", helpers.text)
          // .type() with special character sequences
          .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
          .type('{del}{selectall}{backspace}')
          // .type() with key modifiers
          .type('{alt}{option}') //these are equivalent
          .type('{ctrl}{control}') //these are equivalent
          .type('{meta}{command}{cmd}') //these are equivalent
          .type('{shift}')
        // Delay each keypress by 0.1 sec
          .type('SlowDonald', { delay: 100 })
          .should('have.value', 'SlowDonald')
    })
    it("cannot type numbers or special characters in Name input field", () => {
      //focus on what we are testing
        cy.fillFormComponents()
      
        cy.get('input[name="name"]')
        .type('*123 }(')
      
        cy.get('input:invalid').should('have.length', 1)
      
    })
    it("can type the email correctly in Email input field", () => {
        cy.get('input[name="email"]')
          .type(helpers.user().email)
          .should("have.value", helpers.user().email)
            // .type() with special character sequences
          .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
          .type('{del}{selectall}{backspace}')
            // .type() with key modifiers
          .type('{alt}{option}') //these are equivalent
          .type('{ctrl}{control}') //these are equivalent
          .type('{meta}{command}{cmd}') //these are equivalent
          .type('{shift}')

      // Delay each keypress by 0.1 sec
        .type('slow@moneyfarm.com', { delay: 100 })
        .should('have.value', 'slow@moneyfarm.com')
    })
    it("cannot submit with invalid email", () => {
        //focus on what we are testing
        cy.fillFormComponents()
      
        cy.get('input[name="email"]')
          .clear().type('not a valid email')
      
        cy.get('input:invalid').should('have.length', 1)
  
    })
    it("can type anything in Notes input field", () => {
        cy.get("textarea")
          .type("Can I have 1 HDMI cable with the label !@#+ ?")
          .should("have.value", "Can I have 1 HDMI cable with the label !@#+ ?")
            // .type() with special character sequences
          .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
          .type('{del}{selectall}{backspace}')
            // .type() with key modifiers
          .type('{alt}{option}') //these are equivalent
          .type('{ctrl}{control}') //these are equivalent
          .type('{meta}{command}{cmd}') //these are equivalent
          .type('{shift}')
            // Delay each keypress by 0.1 sec
          .type('I dunno what to write', { delay: 100 })
          .should('have.value', 'I dunno what to write')
    })
    it("cannot submit without Notes", () => {
      //focus on what we are testing
      cy.fillFormComponents()
    
      cy.get('textarea')
        .clear()
    
        .should('have.attr', 'required')

  })
    it("can choose a transport in a single choice dropdown menu", () => {
        cy.get('select').find('option')
          .should('have.length',5)
          .and('be.visible')

        cy.get('select option:disabled')
          .should('have.length', 1)
        
        cy.get('select')
          .select('Bike').should('have.value', 'Bike')
        
        cy.get('select option:selected').should('have.text', 'Bike')

    })
    it("can choose days in multiple choice checkbox menu", () => {
        cy.get('input[id="myCheckBoxID"]')
          .should('have.length',5)
          .check(['Monday','Tuesday'])
          .should('have.attr', 'checked', 'checked')
          .should('have.length',2)
        //see implementation of the checked attribute in index.xml
        cy.get('input[value="Wednesday"')
          .should('not.have.attr', 'checked', 'checked')
          
    })
    it("can choose week in calendar input", () => { 
        cy.get('input[id="week"]')
          .type(`${helpers.year()}-W${helpers.week()}`)
          .should("have.value", `${helpers.year()}-W${helpers.week()}`) 
    })

    it("cannot choose previous week in calendar input", () => { 
        cy.get('input[id="week"]')
          .should('not.have.attr', 'min', `${helpers.week()}`)
        
    })


    it("it should ask for year if adapter needed", () => { 
        cy.get('#myDIV')
          .should('not.be.visible')
      
        cy.get('label[id="mytoggle"]')
          .click()

        cy.get('form')
          .contains('What is the production year of your laptop?') 
    })

    it("can fill the year", () => { 
        cy.get('label[id="mytoggle"]')
          .click()
      
        cy.get('input[type="number"]')
          .invoke('val', 2014)
          .trigger('change')
    })
    
  });

  context("zoom out - test the form submission", () => {
  //ZOOM OUT 
    beforeEach(() => {
    // Cypress starts out with a blank state for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
        cy.visit("/");
        cy.get("form");
    })
    it("can Submit correctly", () => {
    
        //form.page.submit();
          //cy.get('form').should('not.contain', 'Form saved!')
        //fillForm
        cy.fillFormComponents()
        //createApiRopute
        form.page.createApiRoute()
        //use of experimentalFetchPolyfill to have logic in place for sending the form to an API
        //get the response back and save it in the document for simplicity(not best practice)
        form.page.submit()
        cy.contains("Response from the server: Form saved!")
        form.page.waitForApiResponse()
      });
    it("cannot submit with empty or invalid inputs", () => { 

        form.page.submit();

        cy.get('input:invalid')
          .should('have.length', 4)

        cy.contains("Response from the server: undefined")
    })
});