//todo: Billing cycle months выбрать
context('subscriptions', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.createSubscription('@projectId');
    });

    it('edit plan',  function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/subscriptions`);
        cy.get('[data-id="plan.options"]').click();
        cy.get('[data-id="subscriptions.table.plan.options.edit"]').click();
        cy.get('[data-id="name[en]"]')
            .clear()
            .type('test plan name')
            .should('have.value', 'test plan name');
        cy.get('[data-id="description[en]"]')
            .clear()
            .type('test Description')
            .should('have.value', 'test Description');

        cy.get('[data-id="isUserSetAmountManually"][data-value="true"]').click();
        cy.get('[data-id="charge[amount]"]')
            .clear()
            .type('11')
            .should('have.value', '11');
        cy.get('[data-id="charge[period][value]"]')
            .clear()
            .type('12')
            .should('have.value', '12');
        cy.get('[data-id="trial.value"]')
            .clear()
            .type('13')
            .should('have.value', '13');
        cy.get('[data-id="grace_period.value"]')
            .clear()
            .type('14')
            .should('have.value', '14');
        cy.get('button[type="submit"]').click();

//assert
        cy.get('.table-rows__subscr__plan__name')
            .should('have.text', 'test plan name');
        cy.get('.table-rows__subscr__bc span')
            .should('have.text', '12 months');
        cy.get('.table-rows__subscr__camount')
            .should('have.text', '$11.00');

        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/subscriptions`);
        cy.get('.table-rows__subscr__plan__name')
            .should('have.text', 'test plan name');
        cy.get('.table-rows__subscr__bc span')
            .should('have.text', '12 months');
        cy.get('.table-rows__subscr__camount')
            .should('have.text', '$11.00');
    })
});