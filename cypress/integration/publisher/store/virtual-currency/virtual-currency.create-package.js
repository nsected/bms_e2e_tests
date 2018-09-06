//todo: нужно сделать метки с id пакетов
context('VC', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.setCurrency('@projectId');
    });

    it('set currency', function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-currency/packages`);
        cy.get('[data-id="virtual_currency.packages.empty.create"]').click();
        cy.get('[data-id="sku"]').clear().type('test_package').should('have.value', 'test_package');
        cy.get('[data-id="description.en"]').clear().type('test_description').should('have.value', 'test_description');
        cy.get('[data-id="amount"]').clear().type('12345').should('have.value', '12345');
        cy.get('[data-id="prices_array[0].value"]').clear().type('12345').should('have.value', '12345');
        cy.get('[data-id="prices_array[0].name"]').click();
        cy.get('[data-id="search"]').type('USD').should('have.value', 'USD');
        cy.get('.xsui-dropdown__item[data-value="USD"]').click();
        cy.get('[data-id="enabled"]').click();
        cy.get('[type="submit"]').click();
        cy.get('[data-id="table.rows[0]"]');



        cy.get('[data-id="table.rows[0]"] .table-rows__vc__name__info__description').should('have.text', 'test_description');
        cy.get('[data-id="table.rows[0]"] .table-rows__vc__name__info__name').should('have.text', `12345 kitties`);


        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-currency/packages`);
        cy.get('.table-rows__vc__name__info__name').click();

        cy.get('[data-id="sku"]').should('have.value', 'test_package');
        cy.get('[data-id="description.en"]').should('have.value', 'test_description');
        cy.get('[data-id="amount"]').should('have.value', '12345');
        cy.get('[data-id="prices_array[0].value"]').should('have.value', '12345');
        cy.get('[data-id="prices_array[0].name"]').should('have.value', 'USD');
    })
});