context('virtual items', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.createViFolder('@projectId').as('folderId');
        cy.createViItem('@projectId').as('itemId');
    });

    it(Cypress.spec.name, function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-items/groups/ungrouped/items/${this.itemId}`);
        cy.get('[data-id="groups"]').click();
        cy.get('.xsui-tree-select__item .xsui-checkbox__label').click();
        cy.get('[type="submit"]').click();
        cy.get('.ui-empty-view');
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-items/groups/${this.folderId}`);
        cy.get('[data-id="vi.item.name"]')
            .should('have.text', 'test_vi');
    });
});