context('virtual items', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.createViItem('@projectId')
    });

    it(Cypress.spec.name, function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-items/groups/ungrouped`);
        cy.get('[data-id="item.options"]').click();
        cy.get('[data-id="item.delete.enabled"]').click();
        cy.get('.xsui-modal').contains('button', 'Confirm').click();//todo: пометить кнопки модалки удаления
        cy.get('.ui-empty-view').click();
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-items/groups/ungrouped`);
        cy.get('.ui-empty-view').click();
    })
});