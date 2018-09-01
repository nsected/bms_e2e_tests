context('subscriptions', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.createSubscription('@projectId');
    });

    it('test webhooks',  function () {
        //set webhook
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/edit/webhooks/subscriptions`);
        cy.get('[data-id="payment_url"]')
            .clear()
            .type('https://secure.xsolla.com/api/calc/billing/sample.universal.php')
            .should('have.value', 'https://secure.xsolla.com/api/calc/billing/sample.universal.php');
        cy.get('.webhooks-block__form [type="submit"]:not([disabled])').click();

        //test webhook
        cy.get('[data-id="user_id"]')
            .clear()
            .type('11111')
            .should('have.value', '11111');
        cy.get('[data-id="invoice_id"]')
            .clear()
            .type('11111')
            .should('have.value', '11111');
        cy.get('[data-id="amount"]')
            .clear()
            .type('11111')
            .should('have.value', '11111');
        //Currency dropdown
        cy.get('[data-id="currency"]').click();
        cy.get('[data-id="search"]').type('USD').should('have.value', 'USD');
        cy.get('.xsui-dropdown__item[data-value="USD"]').click();
        //Plan ID  dropdown
        cy.get('[data-id="plan_id"]').click();
        cy.get('.xsui-dropdown__item').click();
        //////////
        cy.get('[data-id="product_id"]')
            .clear()
            .type('11111')
            .should('have.value', '11111');
        cy.get('[data-id="foreign_invoice"]')
            .clear()
            .type('11111')
            .should('have.value', '11111');
        cy.get('.webhooks-block__test-forms-container [type="submit"]').click();
        cy.get('.submit-status--success');
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront`);
        cy.get('[data-id="subscriptions"] [data-id="show-in-store"]').click();
        cy.get('[data-id="subscriptions"] .store-card-status--ready');
        cy.get('[data-id="show-in-store"][data-value="true"]');
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront`);
        cy.get('[data-id="show-in-store"][data-value="true"]');
    })
});