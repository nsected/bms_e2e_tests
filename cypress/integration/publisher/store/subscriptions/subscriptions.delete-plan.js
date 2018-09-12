//todo: идентификаторы на кнопки в модалке удаления плана
context('subscriptions', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.createSubscription('@projectId');
    });

    it(Cypress.spec.name,  function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/subscriptions`);
        cy.get('[data-id="plan.options"]').click();
        cy.get('[data-id="plan.options.delete.enabled"]').click();
        cy.get('[class="plan-delete-modal__disable-plan"]').click();
        cy.get('.xsui-button--appearance-alert.xsui-button--fetching');
        cy.get('.xsui-button--appearance-alert:not(.xsui-button--fetching)').click();
        cy.get('.ui-empty-view');

        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/subscriptions`);
        cy.get('.ui-empty-view');
    })
});