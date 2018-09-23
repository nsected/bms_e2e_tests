context('subscriptions', function () {
    before(function() {
        cy.login();
        cy.server({ force404: true });
        cy.fixture('subscriptions/test_request.json').as('test_request_json');
        cy.route('GET', '**/merchant/current/projects/*/subscriptions/plans?*', 'fx:subscriptions/plans.original_plan.json');
        cy.route('GET', '**/merchant/projects/*/subscriptions/plans/*', 'fx:subscriptions/plans.1.json');
        cy.route('GET', '**/merchant/current/currency/list', 'fx:currency/list');
        cy.route('GET', '**/merchant/current/merchants/*/available_locales', 'fx:available_locales.json');
        cy.route('GET', '**/merchant/current/projects/*/components/subscriptions/test', 'fx:subscriptions/test_empty.json');
        cy.route('POST', '**/merchant/current/projects/*/components/subscriptions/test', 'fx:subscriptions/test_response.json').as('test_request');
    });

    it(Cypress.spec.name,  function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${Cypress.env("project")}/edit/webhooks`);
        cy.get('.ui-navigation__section').contains('Subscriptions').click();
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
        cy.wait('@test_request')
            .then(route=>{
                let request = route.request.body;
                let request_fixture = this.test_request_json;
                cy.log(request);
                cy.log(request_fixture);
                expect(request).to.deep.equal(request_fixture);
            });
        cy.get('.submit-status--success');
        // cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront`);
        // cy.get('[data-id="subscriptions"] [data-id="show-in-store"]').click();
        // cy.get('[data-id="subscriptions"] .store-card-status--ready');
        // cy.get('[data-id="show-in-store"][data-value="true"]');
        // cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront`);
        // cy.get('[data-id="show-in-store"][data-value="true"]');
    })
});