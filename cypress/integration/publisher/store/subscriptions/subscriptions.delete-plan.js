//todo: идентификаторы на кнопки в модалке удаления плана
context('subscriptions', function () {
    before(function() {
        cy.login();
        cy.server({ force404: true });
        cy.route('GET', '**/merchant/current/projects/*/subscriptions/plans?*', 'fx:subscriptions/plans.original_plan.json');
        cy.route('GET', '**/merchant/projects/*/subscriptions/plans/*', 'fx:subscriptions/plans.1.json');
        cy.route('GET', '**/merchant/current/currency/list', 'fx:currency/list');
        cy.route('DELETE', '**/merchant/projects/*/subscriptions/plans/*', '').as('plan_deactivation');
        cy.route('DELETE', '**/merchant/projects/*/subscriptions/plans/*/delete', '');
        cy.route({
            method: 'DELETE',
            url: '**/merchant/projects/*/subscriptions/plans/*/delete',
            status: 204,
            response: '',
            delay: 300, //todo: фронт падает без длинной задержки ответа
            headers: {}
        });

    });

    it(Cypress.spec.name,  function () {
        cy.visit(`/${Cypress.env("merchant")}/projects/${Cypress.env("project")}/storefront`);
        cy.get('[data-id="subscriptions.configure"]').click();

        cy.get('[data-id="plan.options"]').click();
        cy.get('[data-id="plan.options.delete.enabled"]').click();
        cy.get('[class="plan-delete-modal__disable-plan"]').click();
        cy.wait('@plan_deactivation');
        // cy.pause();
        cy.get('.xsui-button--appearance-alert:not(.xsui-button--fetching)').click();
        cy.get('.ui-empty-view');
    })
});