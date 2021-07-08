class Page {

    submit() {
      cy.get("form").submit();
    }

    createApiRoute() {
      //spins up a "virtual" server
      cy.server();
    //configures a fake API endpoint
      cy.route({
        url: "/users/**",
        method: "POST",
        response: { status: "Form saved!", code: 201 }
      }).as('Users');
    }

    waitForApiResponse() {
      cy.wait('@Users').then(xhr => {
        expect(xhr.responseBody.code).to.eql(201)
        expect(xhr.responseBody.status).to.eql("Form saved!")
      })
    }
  }
  
  export const page = new Page()