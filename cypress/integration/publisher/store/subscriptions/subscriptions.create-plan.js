//todo: Billing cycle months выбрать
//todo: Create subscription plan пометить кнопку
//todo: SUBSCRIPTION FEE сделать уникальные метки на радиокнопках
context('subscriptions', function () {
    before(function() {
        cy.login();
        cy.server({ force404: true });
        cy.route('GET', '**/merchant/current/projects/*/subscriptions/plans?*', 'fx:subscriptions/plans.empty_plans.json');
        cy.route('GET', '**/merchant/projects/*/subscriptions/plans/*', 'fx:subscriptions/plans.1.json');
        cy.route('POST', '**/merchant/projects/*/subscriptions/plans', 'fx:subscriptions/plans.new_plan.json').as('new_plan');
        cy.route('GET', '**/merchant/current/currency/list', 'fx:currency/list');
    });
//create
    it(Cypress.spec.name,  function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${Cypress.env("project")}/storefront/subscriptions`);
        cy.get('[data-id="subscriptions.create-plan"] button').click();
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
        cy.wait('@new_plan')
            .then(route=>{
                let request = route.request.body;
                let response = route.response.body;
                cy.log(JSON.stringify(request));
                cy.log(JSON.stringify(response));
                // expect(request).to.deep.equal(response);
            });

        cy.get('.table-rows__subscr__plan__name')
            .should('have.text', 'test plan name');
        cy.get('.table-rows__subscr__bc span')
            .should('have.text', '12 months');
        cy.get('.table-rows__subscr__camount')
            .should('have.text', '$11.00');
    })
});