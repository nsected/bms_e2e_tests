context('login', () => {
it('login', () => {
    cy.visit('/');
    cy.get('[name="username"]').type('ttestpublisher@gmail.com').should('have.value', 'ttestpublisher@gmail.com');
    cy.get('[name="password"]').type('TestTestTest111').should('have.value', 'TestTestTest111');
    cy.get('[type="submit"]').click();
    cy.get('.ui-navigation__user').click();
    cy.getCookies()
        .then((cookies) => {
            cy.writeFile('tmp/cookies.json', JSON.stringify(cookies, null, 4))
        })
})
});
