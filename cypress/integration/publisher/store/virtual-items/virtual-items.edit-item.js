//todo: ассерт инпутов?
context('virtual items', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.createViItem('@projectId')
    });

    it(Cypress.spec.name, function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-items/groups/ungrouped`);
        cy.get('[data-id="item.options"]').click();
        cy.get('[data-id="item.edit"]').click();

//////BASIC SETTINGS/////
        cy.get('[data-id="sku"]')
            .clear()
            .type('testsku')
            .should('have.value', 'testsku');
        cy.get('[data-id="item_code"]')
            .clear()
            .type('testcode')
            .should('have.value', 'testcode');
        cy.get('[data-id="name.en"]')
            .clear()
            .type('testvi')
            .should('have.value', 'testvi');
        cy.get('[data-id="description.en"]')
            .clear()
            .type('test short description')
            .should('have.value', 'test short description');
        cy.get('[data-id="long_description.en"]')
            .clear()
            .type('test description')
            .should('have.value', 'test description');
        ////PREFERENCES/////
        cy.get('[data-id="advertisement_type"]').click();
        cy.get('[data-value="best_deal"]').click();

        cy.get('[data-id="item_type"]').click();
        cy.get('[data-value="Expiration"]').click();
        cy.get('[data-id="expiration"]')
            .clear()
            .type('111')
            .should('have.value', '111');

        cy.get('.xsui-input-tag input')
            .clear()
            .type('test_tag')
            .should('have.value', 'test_tag');
        /////////PRICING///////
        cy.get('[data-id="prices_array[0].value"]')
            .clear()
            .type('111')
            .should('have.value', '111');
        cy.get('[data-id="enabled"]').click();
        cy.get('[type="submit"]').click();
        /////asserting/////
        cy.get('[data-id="vi.item.name"]').should('have.text', `testvi`);
        cy.get('[data-id="vi.item.info"]').should('have.text', `testsku`);
        cy.get('.virtual-items-row__id').should('have.text', `$111.00`);//todo: пометить прайс
        ////сброс стейта/////
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-items/groups/ungrouped`);
        cy.get('[data-id="vi.item.name"]').should('have.text', `testvi`);
        cy.get('[data-id="vi.item.info"]').should('have.text', `testsku`);
        cy.get('.virtual-items-row__id').should('have.text', `$111.00`);//todo: пометить прайс
    })
});