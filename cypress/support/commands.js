// этот файл позволяет внедрять собственные команды в райтайм cypress


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

function requestRetry(args) { //пример команды, выполняющей повторную попытку обращения к API при получении статуса 5**
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

Cypress.Commands.overwrite('request', function (originalFn, args) { //мы можем перезаписать даже встроенную команду cypress
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


Cypress.Commands.add("newProject", () => { //пример команды, выполняющей обращение к API приложения. Это удобно для создания моков
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


// Cypress.Commands.add("login", function () { //пример логина приложения, при помощи сохраненных cookies.
//     // Эту команду можно использовать для любого продукта без изменений
//     cy.visit('/');
//     cy.exec('echo "test"'); // выполнение команды на сервере
//     //cypress не использует selenium, но базовая архитектура по прежнему разделена на сервер
//     //и клиент
//     cy.readFile("tmp/cookies.json")
//         .then((cookies) => {
//             cookies.forEach(function (cookie) {
//                 setCookie(cookie.name, cookie.value, {
//                     domain: cookie.domain,
//                     path: cookie.path,
//                     secure: cookie.secure,
//                     expiry: cookie.expiry
//                 })
//             });
//
//             function setCookie(name, value) {
//                 cy.setCookie(name, value)
//             }
//         });
// });




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
