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
Cypress.Commands.overwrite('request', function (originalFn, args) {
    const is500Re = /^5/;
    let retry = Cypress.config("networkCommandRetry");

    function req() {
        return originalFn(args)
            .then((resp) => {
                if (is500Re.test(resp.status) && retry > 0) {
                    retry--;
                    return req()
                }
                return resp
            })
    }

    return req()
});

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
//new Date().toISOString()
Cypress.Commands.add("newProject", () => {
    return cy.request({
        url: `https://api.xsolla.com/merchant/current/merchants/${Cypress.env('merchant')}/projects`,
        method: 'POST',
        headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
        body: {
            "xsolla_tips_enabled": null,
            "id": 34810,
            "descriptor": "2018-09-01T1",
            "name": {"en": new Date().toISOString()},
            "url": "https://xsolla.slack.com/messages/D9GP784TE/details/#",
            "keywords": "",
            "description": "",
            "img": null,
            "payment_url": "",
            "key": "GEtLqMpr4DdAyB3s",
            "is_cancel_implemented": true,
            "enabled": false,
            "return_url": null,
            "is_send_email": false,
            "user_billing_enabled": false,
            "show_user_in_paystation": false,
            "send_email_for_user_billing_purchase": false,
            "is_sandbox_available": 1,
            "locale_list": ["en"],
            "users_count": 0,
            "cardRecurring": false,
            "components": {
                "virtual_currency": {
                    "enabled": true,
                    "status": "configuring",
                    "live": false,
                    "custom_name": []
                },
                "items": {"enabled": true, "status": "configuring", "live": false, "custom_name": []},
                "simple_checkout": {"enabled": true, "status": "configuring", "live": false, "custom_name": []},
                "subscriptions": {"enabled": true, "status": "configuring", "live": false, "custom_name": []},
                "coupons": {"enabled": true, "status": "ready", "live": false, "custom_name": []},
                "game_delivery": {"enabled": true, "status": "configuring", "live": false, "custom_name": []}
            },
            "is_external_id_required": false,
            "send_json_to_paystation": false,
            "ipn_enabled": true,
            "user_public_id_enabled": false,
            "offerwall_enabled": false,
            "autoredirect_from_status_page": "none",
            "autoredirect_from_status_page_in_seconds": 0,
            "status_page_show_return_to_game_link": "done",
            "status_page_return_to_game_link_name": null,
            "xsolla_tips_settings": [],
            "products": {
                "pay_station": {"status": "disconnected"},
                "login": {"status": "disconnected"},
                "launcher": {"status": "disconnected"},
                "store": {"status": "disconnected"},
                "site_builder": {"status": "disconnected"},
                "partner_network": {"status": "disconnected"}
            },
            "payments_available": false
        }
    }).its('body.id')
});

Cypress.Commands.add("createSubscription", (_projectId) => {
    cy.get(_projectId).then((projectId) => {
        return cy.request({
            url: `https://api.xsolla.com/merchant/projects/${projectId}/subscriptions/plans`,
            method: 'POST',
            headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
            body: {
                "charge": {"amount": "111", "currency": "USD", "period": {"value": "222", "type": "month"}},
                "name": {"en": "test Plan name"},
                "description": {"en": "test Description "},
                "trial": {"value": "333", "type": "day"},
                "grace_period": {"value": "360", "type": "day"},
                "external_id": "",
                "expiration": {"value": null, "type": "day"},
                "status": {"value": "active", "counters": {"active": 0, "canceled": 0, "frozen": 0, "non_renewing": 0}}
            }
        })
    })
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
