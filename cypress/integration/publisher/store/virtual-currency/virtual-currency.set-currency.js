context('VC', () => {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
    });

it(Cypress.spec.name, function() {
    cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-currency`);
    cy.get('[data-id="vc_name.en"]')
        .clear()
        .type('vc_name')
        .should('have.value', 'vc_name');
    cy.get('[data-id="base_array[0].value"]').clear()
        .type('111')
        .should('have.value', '111');

    cy.get('[data-id="is_currency_discrete"][data-value="true"]').click();

    cy.get('[data-id="min"]')
        .clear()
        .type('1234')
        .should('have.value', '1234');
    cy.get('[data-id="max"]')
        .clear()
        .type('12345678')
        .should('have.value', '12345678');
    cy.get('[type="submit"]').click();
    cy.get('.xsui-messages__succeeded');




    cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-currency`);
    cy.get('[data-id="vc_name.en"]')
        .should('have.value', 'vc_name');
    cy.get('[data-id="base_array[0].value"]')
        .should('have.value', '111');
    cy.get('[data-id="min"]')
        .should('have.value', '1234');
    cy.get('[data-id="max"]')
        .should('have.value', '12345678');
})
});
 