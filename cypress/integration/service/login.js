const addContext = require('mochawesome/addContext');

context('login', () => {
it(Cypress.spec.name, () => {
    cy.visit('/');
    cy.get('[name="username"]')
        .type(Cypress.env('email'))
        .should('have.value', Cypress.env('email'));
    cy.get('[name="password"]')
        .type(Cypress.env('password'))
        .should('have.value', Cypress.env('password'));
    cy.get('[type="submit"]').click();
    cy.get('.ui-navigation__user').click();
    cy.getCookies()
        .then((cookies) => {
            addContext(mocha.suite, 'simple string');
            cy.writeFile('tmp/cookies.json', JSON.stringify(cookies, null, 4))
        })
})
});
 