context('login', () => {
it(Cypress.spec.name, () => {
    cy.visit('/');
    cy.get('[name="username"]')
        .type(Cypress.env('email'))
        .should('have.value', Cypress.env('email'));
    cy.get('[name="password"]')
        .type(Cypress.env('password'))
        .should('have.value', Cypress.env('password')); // cypress предоставляет
    // удобный доступ к переменным окружения
    // https://docs.cypress.io/guides/guides/environment-variables.html
    cy.get('[type="submit"]').click();
    cy.get('.ui-navigation__user').click();
    cy.getCookies()
        .then((cookies) => {
            cy.writeFile('tmp/cookies.json', JSON.stringify(cookies, null, 4)) //сохраняем cookies
            //для дальшейшей авторизации тестов без задержек
        })
})
});
 