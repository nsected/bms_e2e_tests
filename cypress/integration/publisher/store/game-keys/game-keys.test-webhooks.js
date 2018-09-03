//todo; закончить флоу, подписав договор
//todo: загрузить пинкоды
//todo: сгенерировать пакет
context('game keys', function () {
    before(function() {
        cy.login();
        cy.newProjectWebhookUrlReady().as('projectId');
        cy.createGameKeysFull('@projectId').as('packageId')
    });

    it('test webhooks', function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/edit/webhooks/pay2play`);
        cy.get('[data-id="digital_content_id"]').click();
        cy.get('.xsui-dropdown__item').click();
        cy.get('[data-id="drm_id"]').click();
        cy.get('.xsui-dropdown__item[data-value="1"]').click();
        cy.get('[data-id="user_id"]')
            .clear()
            .type('1')
            .should('have.value', '1');
        cy.get('[data-id="invoice_id"]')
            .clear()
            .type('1')
            .should('have.value', '1');
        cy.get('[data-id="amount"]')
            .clear()
            .type('1')
            .should('have.value', '1');
        cy.get('[data-id="currency"]').click();
        cy.get('[data-value="AFN"]').click();
        cy.get('[data-id="pin_code"]')
            .clear()
            .type('1')
            .should('have.value', '1');
        cy.get('[data-id="foreign_invoice"]')
            .clear()
            .type('1')
            .should('have.value', '1');
        cy.get('.webhooks-block__test-forms-container [type="submit"]').click();
        cy.get('.submit-status--success');
    });
});