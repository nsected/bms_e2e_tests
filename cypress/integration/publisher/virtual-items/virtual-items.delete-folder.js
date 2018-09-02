//todo: заполненая папка
context('virtual items', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.createViFolder('@projectId').as('folderId');
    });

    it('delete folder', function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-items`);
        cy.get('[data-id="group.options"]').click();
        cy.get('[data-id="group.delete.enabled"]').click();
        cy.get('.xsui-modal').contains('button', 'Confirm').click();//todo: пометить кнопки модалки удаления
        cy.get('.ui-empty-view');
        cy.reload();
        cy.get('.ui-empty-view');
    });
});