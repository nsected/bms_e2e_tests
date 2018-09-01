context('VC', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.setCurrency('@projectId');
        cy.createPackage('@projectId');
    });

    it('set currency', function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-currency/packages`);
        cy.get('.table-rows__vc__name__info__name').click();

        cy.get('[data-id="sku"]').clear().type('test_package_edit').should('have.value', 'test_package_edit');
        cy.get('[data-id="description.en"]').clear().type('test_description_edit').should('have.value', 'test_description_edit');
        cy.get('[data-id="amount"]').clear().type('111111').should('have.value', '111111');
        cy.get('[data-id="prices_array[0].value"]').clear().type('111111').should('have.value', '111111');

        cy.get('[type="submit"]').click();
        cy.get('[data-id="table.rows[0]"]');



        cy.get('.table-rows__vc__name__info__description').should('have.text', 'test_description_edit');
        cy.get('.table-rows__vc__name__info__name').should('have.text', `111111 kitties`);


        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-currency/packages`);
        cy.get('.table-rows__vc__name__info__name').click();

        cy.get('[data-id="sku"]').should('have.value', 'test_package_edit');
        cy.get('[data-id="description.en"]').should('have.value', 'test_description_edit');
        cy.get('[data-id="amount"]').should('have.value', '111111');
        cy.get('[data-id="prices_array[0].value"]').should('have.value', '111111');
    })
});