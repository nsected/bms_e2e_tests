context('virtual items', function () {
    before(function() {
        cy.login();
        cy.newProjectWebhookUrlReady().as('projectId');
        cy.createViItem('@projectId').as('itemId');
    });

    it('test vi webhooks', function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/edit/webhooks/virtual-items`);
        cy.get('[data-id="user_id"]')
            .clear()
            .type('test')
            .should('have.value', 'test');
        cy.get('[data-id="invoice_id"]')
            .clear()
            .type('1')
            .should('have.value', '1');
        cy.get('[data-id="items_real_currency[0].name"]').click();
        cy.get('.xsui-dropdown__item').click();
        cy.get('[data-id="items_real_currency[0].count"]')
            .clear()
            .type('1')
            .should('have.value', '1');
        cy.get('[data-id="foreign_invoice"]')
            .clear()
            .type('1')
            .should('have.value', '1');

        cy.get('.webhooks-block__test-forms-container [type="submit"]').click();
        cy.get('.submit-status--success');

        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront`);
        cy.get('[data-id="items"] [data-id="show-in-store"]').click();
        cy.get('[data-id="items"] .store-card-status--ready');
        cy.get('[data-id="items"]  [data-id="show-in-store"][data-value="true"]');
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront`);
        cy.get('[data-id="items"]  [data-id="show-in-store"][data-value="true"]');
    });
});