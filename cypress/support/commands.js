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

function requestRetry(args) {
    const is500Re = /^5/;
    let retry = Cypress.config("networkCommandRetry");

    function req() {
        return cy.request(args)
            .then((resp) => {
                if (is500Re.test(resp.status) && retry > 0) {
                    retry--;
                    return req()
                }
                return resp
            })
    }
    return req()
}

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

Cypress.Commands.add("test", (str) => {
    cy.log(str);
    cy.log(str);
    cy.log(Cypress.spec);
    cy.log(Cypress);
    cy.log(this);
    cy.log(cy)
});

Cypress.Commands.add("newProject", () => {
    allure.createStep('sssss', ()=>{});
    return requestRetry({
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



Cypress.Commands.add("testVc", (_vcpkgid) => {
    cy.get(_vcpkgid).then((vcpkgid) => {
        return requestRetry({
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
        return requestRetry({
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
        return requestRetry({
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
        return requestRetry({
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
        requestRetry({
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
    return requestRetry({
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
        return requestRetry({
            url: `https://api.xsolla.com/merchant/current/projects/${projectId}/virtual_items/groups`,
            method: 'POST',
            headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
            body: {"name": {"en": "a_new_folder"}, "description": {"en": "1"}, "enabled": true, "code": "1", "parent_id": null}
        }).its('body.group_id')
    })
});

Cypress.Commands.add("newProjectWebhookUrlReady", () => {
    return requestRetry({
        url: `https://api.xsolla.com/merchant/current/merchants/${Cypress.env('merchant')}/projects`,
        method: 'POST',
        headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
        body: {
            "xsolla_tips_enabled": null,
            "id": 34954,
            "descriptor": "2018-09-01T1",
            "name": {"en": "2018-09-02T19:04:58.486Z"},
            "url": "https://xsolla.slack.com/messages/D9GP784TE/details/#",
            "keywords": "",
            "description": "",
            "img": null,
            "payment_url": "https://secure.xsolla.com/api/calc/billing/sample.universal.php",
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
                "virtual_currency": {
                    "enabled": true,
                    "status": "configuring",
                    "live": false,
                    "custom_name": []
                },
                "items": {"enabled": true, "status": "testing", "live": false, "custom_name": []},
                "simple_checkout": {"enabled": true, "status": "testing", "live": false, "custom_name": []},
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

Cypress.Commands.add("createGameKeysBasic", (_projectId) => {
    cy.get(_projectId).then((projectId) => {
        return requestRetry({
            url: `https://api.xsolla.com/merchant/current/projects/${projectId}/game_delivery`,
            method: 'POST',
            headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
            body: {
                "name": {"en": "test Game title"},
                "description": {"en": "test Description"},
                "default_currency": "USD",
                "system_requirements": "system_requirements",
                "release_date": "2018-09-30T05:00:00+05:00",
                "delivery": {
                    "release_date_type": "quarter",
                    "is_pre_order": true,
                    "is_partner_side_processing": false,
                    "delivery_method": {"default": ["key"], "exceptions": {}}
                },
                "files": [],
                "obtain_code_from_api": false,
                "obtain_code_from_db": true,
                "sales_exist": false,
                "drm": [{
                    "id": 1,
                    "name": "Steam",
                    "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/1.1472111837.svg",
                    "platforms": [{"id": 2, "name": "Linux"}],
                    "enabled": true
                }, {
                    "id": 2,
                    "name": "Playstation",
                    "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/2.1535378400.svg",
                    "platforms": [],
                    "enabled": false
                }, {
                    "id": 3,
                    "name": "XBox",
                    "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/3.1460367796.svg",
                    "platforms": [],
                    "enabled": false
                }, {
                    "id": 4,
                    "name": "Uplay",
                    "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/4.1460367796.svg",
                    "platforms": [],
                    "enabled": false
                }, {
                    "id": 5,
                    "name": "Origin",
                    "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/5.1460367796.svg",
                    "platforms": [],
                    "enabled": false
                }, {
                    "id": 6,
                    "name": "DRM Free",
                    "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/6.1509084108.svg",
                    "platforms": [{"id": 1, "name": "Windows"}],
                    "enabled": true
                }, {
                    "id": 7,
                    "name": "GOG",
                    "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/7.1492784697.svg",
                    "platforms": [],
                    "enabled": false
                }],
                "sku": "test"
            }
        }).its('body.id')
    })
});

Cypress.Commands.add("createGameKeysFull", (_projectId) => {
    cy.get(_projectId).then((projectId) => {
        return requestRetry({
            url: `https://api.xsolla.com/merchant/current/projects/${projectId}/game_delivery`,
            method: 'POST',
            headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
            body: {"name":{"en":"test Game title"},"description":{"en":"test Description"},"default_currency":"USD","system_requirements":"system_requirements","release_date":"2018-09-30T05:00:00+05:00","delivery":{"release_date_type":"quarter","is_pre_order":true,"is_partner_side_processing":false,"delivery_method":{"default":["key"],"exceptions":{}}},"files":[],"obtain_code_from_api":false,"obtain_code_from_db":true,"sales_exist":false,"drm":[{"id":1,"name":"Steam","image":"//cdn.xsolla.net/misc/game_delivery/drms/set2/1.1472111837.svg","platforms":[{"id":2,"name":"Linux"}],"enabled":true},{"id":2,"name":"Playstation","image":"//cdn.xsolla.net/misc/game_delivery/drms/set2/2.1535378400.svg","platforms":[],"enabled":false},{"id":3,"name":"XBox","image":"//cdn.xsolla.net/misc/game_delivery/drms/set2/3.1460367796.svg","platforms":[],"enabled":false},{"id":4,"name":"Uplay","image":"//cdn.xsolla.net/misc/game_delivery/drms/set2/4.1460367796.svg","platforms":[],"enabled":false},{"id":5,"name":"Origin","image":"//cdn.xsolla.net/misc/game_delivery/drms/set2/5.1460367796.svg","platforms":[],"enabled":false},{"id":6,"name":"DRM Free","image":"//cdn.xsolla.net/misc/game_delivery/drms/set2/6.1509084108.svg","platforms":[{"id":1,"name":"Windows"}],"enabled":true},{"id":7,"name":"GOG","image":"//cdn.xsolla.net/misc/game_delivery/drms/set2/7.1492784697.svg","platforms":[],"enabled":false}],"sku":"test"}
        }).then(response=>{
            requestRetry({
                url: `https://api.xsolla.com/merchant/current/projects/${projectId}/game_delivery/${response.body.id}`,
                method: 'PUT',
                 headers: {"Authorization": "Basic NTcyNjU6a2tra2tra2tra2tr"},
                 body: {
                     "obtain_code_from_api": false,
                     "obtain_code_from_db": true,
                     "drm": [{
                         "id": 1,
                         "name": "Steam",
                         "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/1.1472111837.svg",
                         "platforms": [{"id": 2, "name": "Linux"}],
                         "prices": {"USD": 12345},
                         "codes": {"total": 0, "active": 0, "used": 0},
                         "enabled": true
                     }, {
                         "id": 2,
                         "name": "Playstation",
                         "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/2.1535378400.svg",
                         "platforms": [],
                         "codes": {"total": 0, "active": 0, "used": 0},
                         "enabled": false
                     }, {
                         "id": 3,
                         "name": "XBox",
                         "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/3.1460367796.svg",
                         "platforms": [],
                         "codes": {"total": 0, "active": 0, "used": 0},
                         "enabled": false
                     }, {
                         "id": 4,
                         "name": "Uplay",
                         "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/4.1460367796.svg",
                         "platforms": [],
                         "codes": {"total": 0, "active": 0, "used": 0},
                         "enabled": false
                     }, {
                         "id": 5,
                         "name": "Origin",
                         "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/5.1460367796.svg",
                         "platforms": [],
                         "codes": {"total": 0, "active": 0, "used": 0},
                         "enabled": false
                     }, {
                         "id": 6,
                         "name": "DRM Free",
                         "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/6.1509084108.svg",
                         "platforms": [{"id": 1, "name": "Windows"}],
                         "prices": {"USD": 6789},
                         "codes": {"total": 0, "active": 0, "used": 0},
                         "enabled": true
                     }, {
                         "id": 7,
                         "name": "GOG",
                         "image": "//cdn.xsolla.net/misc/game_delivery/drms/set2/7.1492784697.svg",
                         "platforms": [],
                         "codes": {"total": 0, "active": 0, "used": 0},
                         "enabled": false
                     }],
                     "default_currency": "USD",
                     "tips_enabled": true,
                     "id": 3225,
                     "sku": "test1",
                     "name": {"en": "test Game title"},
                     "description": {"en": "test Description"},
                     "system_requirements": "system_requirements",
                     "image_url": "//cdn.xsolla.net/img/misc/merchant/default-item.png",
                     "long_description": null,
                     "locales_list": null,
                     "publisher": null,
                     "developer": null,
                     "video_link": null,
                     "genre": null,
                     "additional_info": null,
                     "forum_link": null,
                     "support_link": null,
                     "old_price": null,
                     "parent_id": null,
                     "release_date": "2018-09-30T05:00:00+05:00",
                     "delivery": {
                         "release_date_type": "quarter",
                         "delivery_method": {"default": ["key"], "exceptions": {}},
                         "is_pre_order": true,
                         "is_partner_side_processing": false
                     },
                     "files": [],
                     "sales_exist": false
                 }
             })
        })
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
