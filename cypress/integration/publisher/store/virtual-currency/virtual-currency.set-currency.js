context('VC', () => {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
    });

it(Cypress.spec.name, function() {
    cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-currency`);
    cy.get('[data-id="vc_name.en"]')
        .clear()
        .type(Cypress.env('vc_name'))
        .should('have.value', Cypress.env('vc_name'));
    cy.get('[data-id="base_array[0].value"]').clear()
        .type(Cypress.env('vc_currency_price'))
        .should('have.value', Cypress.env('vc_currency_price'));

    cy.get('[data-id="is_currency_discrete"][data-value="true"]').click();

    cy.get('[data-id="min"]')
        .clear()
        .type(Cypress.env('vc_min_purchase_value'))
        .should('have.value', Cypress.env('vc_min_purchase_value'));
    cy.get('[data-id="max"]')
        .clear()
        .type(Cypress.env('vc_max_purchase_value'))
        .should('have.value', Cypress.env('vc_max_purchase_value'));
    cy.get('[type="submit"]').click();
    cy.get('.xsui-messages__succeeded');




    cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-currency`);
    cy.get('[data-id="vc_name.en"]')
        .should('have.value', Cypress.env('vc_name'));
    cy.get('[data-id="base_array[0].value"]')
        .should('have.value', Cypress.env('vc_currency_price'));
    cy.get('[data-id="min"]')
        .should('have.value', Cypress.env('vc_min_purchase_value'));
    cy.get('[data-id="max"]')
        .should('have.value', Cypress.env('vc_max_purchase_value'));
})
});
 