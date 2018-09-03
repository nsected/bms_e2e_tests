//todo: загрузка ключей
context('game keys', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.createGameKeysBasic('@projectId').as('packageId')
    });

    it('Price settings', function () {
        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/pay2play/${this.packageId}/price-settings`);


        //////Price settings////////
        cy.get('[data-id="drm[0].prices_array[0].value"]')
            .clear()
            .type('12345')
            .should('have.value', '12345');
        cy.get('[data-id="drm[5].prices_array[0].value"]')
            .clear()
            .type('6789')
            .should('have.value', '6789');
        cy.get('[data-id="tips_enabled"]').click();
        cy.get('button[type="submit"]').click();
        cy.get('[data-id="nav.keys"][aria-current="true"]');

        cy.go('back');
        cy.reload();
        cy.get('[data-id="drm[0].prices_array[0].value"]')
            .should('have.value', '12345');
        cy.get('[data-id="drm[5].prices_array[0].value"]')
            .should('have.value', '6789');
        cy.get('[data-id="tips_enabled"][data-value="true"]');
        cy.get('button[type="submit"]').click();


        //////keys////////
        cy.get('[data-id="obtain_code_from_api"]').click();

        cy.get('button[type="submit"]').click();
        cy.get('[data-id="nav.widget"][aria-current="true"]');
        cy.go('back');
        cy.reload();
        cy.get('[data-id="obtain_code_from_api"][data-value="true"]');
        cy.get('button[type="submit"]').click();



        //////Widget customization////////
        cy.get('[data-id="widget_settings.background"]').click();
        // cy.get('.xsui-dropdown__item[value="dark"]').click();
        // cy.get('[data-id="widget_settings.foreground"]').click();
        // cy.get('.xsui-dropdown__item[value="blue"]').click();
        // cy.get('button[type="submit"]').click();
        // cy.get('button[type="submit"].xsui-button--fetching');
        // cy.get('button[type="submit"]');

        // cy.reload();
        // cy.get('[data-id="widget_settings.background"]') todo: поправить баг с отображением цветов виджета
        // cy.get('[data-id="widget_settings.foreground"]')

        cy.visit(`/${Cypress.env('merchant')}/projects/${this.projectId}/storefront/pay2play`);
        cy.get('.table-rows__p2p__name')
            .should('have.text', 'test Game title');
        cy.get('[data-id="p2p-package.drms[0]"] .table-rows__p2p__drm-item__price')
            .should('have.text', '$12,345.00');
        cy.get('[data-id="p2p-package.drms[1]"] .table-rows__p2p__drm-item__price')
            .should('have.text', '$6,789.00');
    });
});