context('error', function () {
    before(function() {
        cy.login();
    });

    it(Cypress.spec.name,  function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${Cypress.env("project")}/`)
            .then(()=>{
                throw new  Error ('Example error')
            })
    })
});