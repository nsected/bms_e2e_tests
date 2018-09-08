context('test', function () {
    before(function() {
        cy.test(1);
    });

    it('test1', function () {
        cy.log(Cypress.spec);
        cy.log(Cypress);
        cy.log(this);
        cy.log(cy);
        cy.retry;
    });
});