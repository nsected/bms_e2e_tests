context('virtual items', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.createViItem('@projectId')
    });

    it('edit item', function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-items`);
        cy.get('[data-id="search"]')
            .click()
            .type('test_vi')
            .should('have.value', 'test_vi');
        cy.get('[data-id="vi.search.item-test"]').click();
        cy.get('.head h3').should('have.text', 'test_vi');
    })
});