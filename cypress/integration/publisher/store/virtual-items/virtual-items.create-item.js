context('virtual items', function () {
    before(function() {
        cy.login();
        cy.newProjectVcReady().as('projectId');
        cy.setCurrency('@projectId');
        cy.createVcPackage('@projectId').as('vcpkgId');
    });

    it('create item', function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-items`);
        cy.get('[data-id="vi.options.create"]').click();
        cy.get('[data-id="vi.options.create.package"]').click();
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
        cy.get('[data-value="virtual_currency"]').click();
        cy.get('[data-id="virtual_currency_price"]')
            .clear()
            .type('111')
            .should('have.value', '111');
        cy.get('[data-id="enabled"]').click();
        cy.get('[type="submit"]').click();
        /////asserting/////
        cy.get('[data-id="vi.group.name"]').click();
        cy.get('[data-id="vi.item.name"]').should('have.text', `testvi`);
        cy.get('[data-id="vi.item.info"]').should('have.text', `testsku`);
        cy.get('.virtual-items-row__id').should('have.text', `111 kitties`);//todo: пометить прайс
        ////сброс стейта/////
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/virtual-items/groups/ungrouped`);
        cy.get('[data-id="vi.item.name"]').should('have.text', `testvi`);
        cy.get('[data-id="vi.item.info"]').should('have.text', `testsku`);
        //cy.get('.virtual-items-row__id').should('have.text', `111 kitties`);
        // todo: поправить баг с отображением названия валюты VC
    })
});