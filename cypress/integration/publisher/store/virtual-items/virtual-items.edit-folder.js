context('virtual items', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.createViFolder('@projectId').as('folderId');
    });

    it(Cypress.spec.name, function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-items`);
        cy.get('[data-id="group.options"]').click();
        cy.get('[data-id="group.edit"]').click();

        cy.get('[data-id="code"]')
            .clear()
            .type('folder_code')
            .should('have.value', 'folder_code');
        cy.get('[data-id="name.en"]')
            .clear()
            .type('test_folder')
            .should('have.value', 'test_folder');
        cy.get('[name="description.en"]')
            .clear()
            .type('test Description')
            .should('have.value', 'test Description');

        cy.get('[data-id="enabled"]').click();
        cy.get('[type="submit"]').click();
        ////assert/////

        cy.get('[data-id="vi.group.name"]')
            .should('have.text', 'test_folder');
        cy.get('[data-id="vi.group.name"]').click();
        cy.get('.head h3')
            .should('have.text', 'test_folder');
        cy.reload();
        cy.get('.head h3')
            .should('have.text', 'test_folder');
    });
});