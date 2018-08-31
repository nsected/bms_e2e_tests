//todo: пометить кнопку confirm и другие модалки
context('VC', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.setCurrency('@projectId');
        cy.createPackage('@projectId');
    });

    it('set currency',  function () {
        cy.pause();
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-currency/packages`);
        cy.get('.xsui-icon-more').click();
        cy.get('[data-id="virtual_currency.packages.delete"]').click();
        cy.get('.xsui-modal').contains('Confirm').click();
        cy.get('[data-id="virtual_currency.packages.empty.create"]').click();
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-currency/packages`);
        cy.get('[data-id="virtual_currency.packages.empty.create"]').click();
    })
});