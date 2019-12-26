context('login', () => {
it(Cypress.spec.name, () => {
    cy.visit('/');
    cy.get('[name="login"]')
        .type(Cypress.env('email'))
        .should('have.value', Cypress.env('email'));
    cy.get('[name="password"]')
        .type(Cypress.env('password'))
        .should('have.value', Cypress.env('password'));
    cy.get('[type="button"]').click();
    cy.xpath('//*[@href="/profile" and text()="Петр Петрович"]')
        // .should('have.value', "Петр Петрович");
})
});
 