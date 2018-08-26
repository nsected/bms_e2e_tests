context('login', () => {
it('login', () => {
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
            cy.writeFile('tmp/cookies.json', JSON.stringify(cookies, null, 4))
        })
})
});
 