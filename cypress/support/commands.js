// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", function () {
    cy.visit('/');
    cy.readFile("tmp/cookies.json")
        .then((cookies) => {
            cookies.forEach(function (cookie) {
                setCookie(cookie.name, cookie.value, {
                    domain: cookie.domain,
                    path: cookie.path,
                    secure: cookie.secure,
                    expiry: cookie.expiry
                })
            });

            function setCookie(name, value) {
                cy.setCookie(name, value)
            }
        });
});

Cypress.Commands.add("newProject", () => {
    return cy.request({
        url: `https://api.xsolla.com/merchant/current/merchants/${Cypress.env('merchant')}/projects`,
        method: 'POST',
        headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
        body: {
            "locale_list": [
                "en"
            ],
            "name": {
                "en": new Date().toISOString()
            },
            "keywords": "",
            "payment_url": "",
            "key": "GEtLqMpr4DdAyB3s",
            "ipn_enabled": true,
            "is_cancel_implemented": true,
            "is_external_id_required": false,
            "enabled": false,
            "is_send_email": false,
            "return_url": "",
            "is_sandbox_available": 1,
            "users_count": 0,
            "cardRecurring": false,
            "descriptor": "",
            "components": {
                "virtual_currency": {
                    "enabled": false,
                    "custom_name": {}
                },
                "items": {
                    "enabled": false,
                    "custom_name": {}
                },
                "subscriptions": {
                    "enabled": false,
                    "custom_name": {}
                },
                "coupons": {
                    "enabled": false,
                    "custom_name": {}
                },
                "game_delivery": {
                    "enabled": false,
                    "custom_name": {}
                },
                "simple_checkout": {
                    "enabled": false,
                    "custom_name": {}
                }
            },
            "user_billing_enabled": false,
            "show_user_in_paystation": false,
            "send_json_to_paystation": false,
            "user_public_id_enabled": false,
            "autoredirect_from_status_page": "none",
            "autoredirect_from_status_page_in_seconds": 0,
            "status_page_show_return_to_game_link": "done",
            "status_page_return_to_game_link_name": {},
            "xsolla_tips_enabled": null,
            "url": "https://xsolla.slack.com/messages/D9GP784TE/details/#",
            "img": null
        }
    }).its('body.id')
});

Cypress.Commands.add("createPackage", (_projectId) => {
    cy.get(_projectId).then((projectId) => {
        return cy.request({
            url: `https://api.xsolla.com/merchant/current/projects/${projectId}/virtual_currency/packages`,
            method: 'POST',
            headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
            body: {
                "advertisement_type": "custom",
                "advertisement_type_custom": {"en": "test label"},
                "amount": "12345",
                "description": {"en": "test package"},
                "enabled": true,
                "id": null,
                "image_url": "//cdn.xsolla.net/img/misc/images/650f46707d297c9526b944aba0ac978b.jpg",
                "prices_array": [{"name": "USD", "value": "12345"}],
                "sku": "test"
            }
        })
    })
});

Cypress.Commands.add("setCurrency", (_projectId) => {
    cy.get(_projectId).then((projectId) => {
        cy.request({
            url: `https://api.xsolla.com/merchant/current/projects/${projectId}/virtual_currency`,
            method: 'PUT',
            headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
            body: {
                "allow_user_sum": false,
                "base": {"USD": 12345},
                "default_currency": "USD",
                "is_currency_discrete": false,
                "max": 123456789999,
                "min": 12345,
                "packets": [],
                "type": "standard",
                "vc_name": {"en": "kitties"},
                "id": 32282,
                "image_url": "//cdn.xsolla.net/img/misc/images/3ca1ac56570c11098403e0ccb2264518.jpg"
            }
        })
    });
});

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
