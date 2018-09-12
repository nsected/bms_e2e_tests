context('game keys', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
    });

    it(Cypress.spec.name, function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/pay2play`);
        cy.get('[data-id="create-package1"] button').click();
        cy.get('[data-id="sku"]')
            .clear()
            .type('test')
            .should('have.value', 'test');
        cy.get('[data-id="name[en]"]')
            .clear()
            .type('test Game title')
            .should('have.value', 'test Game title');
        cy.get('[data-id="description[en]"]')
            .clear()
            .type('test Description')
            .should('have.value', 'test Description');


        cy.get('[data-id="delivery[is_pre_order]"]').click();
        cy.get('[data-value="quarter"]').click();
        cy.get('[data-id="drm[0].enabled"]').click();
        cy.get('.xsui-tag').contains('Linux').click();
        cy.get('[data-id="drm[5].enabled"]').click();
        cy.get('[type="submit"]').click();
        cy.get('[aria-current="true"][data-id="nav.price"]');
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/pay2play`);
        cy.get('.table-rows__p2p__name')
            .should('have.text', 'test Game title');
        cy.get('[data-id="p2p-package.drms"] [data-id="p2p-package.drms[0]"] .table-rows__p2p__drm-item__name')
            .should('have.text', 'Steam');
        cy.get('[data-id="p2p-package.drms"] [data-id="p2p-package.drms[1]"] .table-rows__p2p__drm-item__name')
            .should('have.text', 'DRM Free');
    });
});