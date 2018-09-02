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
});//todo: не работает в commands файле, исправить

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

Cypress.Commands.add("testVc", (_vcpkgid) => {
    cy.get(_vcpkgid).then((vcpkgid) => {
        return cy.request({
            url: `https://api.xsolla.com/merchant/current/merchants/${Cypress.env('merchant')}/components/virtual_currency/test`,
            method: 'POST',
            headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
            body: {
                "user_id": {"value": "1"},
                "invoice_id": {"value": "1"},
                "virtual_currency_package_id": {"value": vcpkgid},
                "foreign_invoice": {"value": "1"}
            }
        })
    })
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

Cypress.Commands.add("createViItem", (_projectId) => {
    cy.get(_projectId).then((projectId) => {
        return cy.request({
            url: `https://api.xsolla.com/merchant/current/projects/${projectId}/virtual_items/items`,
            method: 'POST',
            headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
            body: {
                "name": {"en": "test_vi"},
                "description": {"en": "test Short description"},
                "long_description": {"en": "test description "},
                "enabled": true,
                "item_code": "test_item",
                "advertisement_type": "best_deal",
                "item_type": "Physical",
                "keywords": {"en": ["test-tag"]},
                "groups": [],
                "default_currency": "USD",
                "expiration": null,
                "image_url": "//cdn.xsolla.net/img/misc/images/20b5d24953724bff5eb36845a8976c33.jpg",
                "permanent": false,
                "prices": {"USD": "12345"},
                "sku": "test",
                "user_attribute_conditions": []
            }
        }).its('body.item_id')
    })
});

Cypress.Commands.add("createVcPackage", (_projectId) => {
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
        }).its('body.id')
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

Cypress.Commands.add("newProjectVcReady", () => {
    return cy.request({
        url: `https://api.xsolla.com/merchant/current/merchants/${Cypress.env('merchant')}/projects`,
        method: 'POST',
        headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
        body: {
            "xsolla_tips_enabled": null,
            "id": 34811,
            "descriptor": "2018-09-01T1",
            "name": {"en": new Date().toISOString()},
            "url": "https://xsolla.slack.com/messages/D9GP784TE/details/#",
            "keywords": "",
            "description": "",
            "img": null,
            "payment_url": "https://secure.xsolla.com/api/calc/billing/sample.universal.php#1111",
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
            "cardRecurring": true,
            "components": {
                "virtual_currency": {"enabled": true, "status": "ready", "live": true, "custom_name": []},
                "items": {"enabled": true, "status": "testing", "live": false, "custom_name": []},
                "simple_checkout": {"enabled": false, "status": "testing", "live": false, "custom_name": []},
                "subscriptions": {"enabled": true, "status": "testing", "live": false, "custom_name": []},
                "coupons": {"enabled": false, "status": "ready", "live": false, "custom_name": []},
                "game_delivery": {"enabled": false, "status": "configuring", "live": false, "custom_name": []}
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
                "pay_station": {"status": "connected"},
                "login": {"status": "disconnected"},
                "launcher": {"status": "disconnected"},
                "store": {"status": "connected"},
                "site_builder": {"status": "disconnected"},
                "partner_network": {"status": "disconnected"}
            },
            "payments_available": false
        }
    }).its('body.id')
});

Cypress.Commands.add("createViFolder", (_projectId) => {
    cy.get(_projectId).then((projectId) => {
        return cy.request({
            url: `https://api.xsolla.com/merchant/current/projects/${projectId}/virtual_items/groups`,
            method: 'POST',
            headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
            body: {"name": {"en": "1"}, "description": {"en": "1"}, "enabled": true, "code": "1", "parent_id": null}
        }).its('body.group_id')
    })
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
