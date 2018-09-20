//todo: Billing cycle months выбрать
context('subscriptions', function () {
    before(function() {
        cy.login();
        cy.server({ force404: true });
        cy.route('GET', '**/merchant/current/projects/*/subscriptions/plans?*', 'fx:subscriptions/plans.original_plan.json');
        cy.route('GET', '**/merchant/projects/*/subscriptions/plans/*', 'fx:subscriptions/plans.1.json');
        cy.route('PUT', '**/merchant/projects/*/subscriptions/plans/*', 'fx:subscriptions/plans.edited_plan.json').as('edited_plan');
        cy.route('GET', '**/merchant/current/currency/list', 'fx:currency/list');
    });

    it(Cypress.spec.name,  function () {
        const { _, $ } = Cypress;

        cy.visit(`/${Cypress.env("merchant")}/projects/${Cypress.env("project")}/storefront`);
        cy.get('[data-id="subscriptions.configure"]').click();
        //assert
        cy.get('.table-rows__subscr__plan__name')
            .should('have.text', 'test plan name');
        cy.get('.table-rows__subscr__bc span')
            .should('have.text', '222 months');
        cy.get('.table-rows__subscr__camount')
            .should('have.text', '$111.00');

        //edit


        cy.get('[data-id="plan.options"]').click();

        cy.get('[data-id="subscriptions.table.plan.options.edit"]').click();

        cy.get('[data-id="name[en]"]')
            .clear()
            .type('test plan name2')
            .should('have.value', 'test plan name2');
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
        cy.wait('@edited_plan')
            .then(route=>{
                cy.log(JSON.stringify(route.request.body));
                cy.log(JSON.stringify(route.response.body));
            })
    })
});