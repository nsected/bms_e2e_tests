context('subscriptions', function () {
    before(function() {
        cy.login();//опереляем кастомную команду для удобства написания тестов.  https://docs.cypress.io/api/cypress-api/custom-commands.html#Syntax
        //все кастомные команды определяются в папке plugins/commands.js, который в свою очередь является частью файла, определяющег плагины cypress
        //https://docs.cypress.io/guides/tooling/plugins-guide.html#Using-a-plugin. Возможна как установка сторонних плагинов, так и определение собственных.
        //репозиторий плагинов cypress содержит много полезных дополнений, такие как https://github.com/palmerhq/cypress-image-snapshot
        //аналог gemini, для визуального сравнения фронтэнда
        cy.server({ force404: true }); //запросы к неопределенным в роутере аресам будут заблокированы ответом 404, что гарантирует безопасную работу даже с production окружением.
        // https://docs.cypress.io/api/commands/server.html#Options
        cy.fixture('subscriptions/test_request.json').as('test_request_json'); //пример загрузки фикстуры в переменную, для дальнейщего использования.
        // https://docs.cypress.io/api/commands/fixture.html#Syntax
        // система переменных cypress нетривиальна, в следствии использовании самописной очереди исполнения.
        // Документация подробно расписывает механизм их работы.
        // https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Return-Values
        cy.route('GET', '**/merchant/current/projects/*/subscriptions/plans?*', 'fx:subscriptions/plans.original_plan.json'); //этот роут выдает приложению фикстуру, вместо реального ответа от сервера
        // https://docs.cypress.io/api/commands/route.html#Fixtures
        // все фикстуры хранятся в папке с одноименным названием fixtures
        cy.route('GET', '**/merchant/projects/*/subscriptions/plans/*', 'fx:subscriptions/plans.1.json'); //для создания масок адреса используется пакет minimath https://www.npmjs.com/package/minimatch
        // таким образом можно охватить адреса с изменемым хостом.
        cy.route('GET', '**/merchant/current/currency/list', 'fx:currency/list');//подменяем все запросы frontend приложения на фикестуры. Нет необходимости в исползовании реального API.
        // Внутренний сервер Cypres отвечает не больше чем за 1000ms, что на порядок быстрее реального API https://docs.cypress.io/guides/guides/network-requests.html#Testing-Strategies
        cy.route('GET', '**/merchant/current/merchants/*/available_locales', 'fx:available_locales.json');
        cy.route('GET', '**/merchant/current/projects/*/components/subscriptions/test', 'fx:subscriptions/test_empty.json');
        cy.route('GET', '**/merchant/current/projects/*/components/subscriptions/test', 'fx:subscriptions/test_empty.json');
        cy.route({
            // пример расширенного использования метода route.
            // Передаем параметры в функцию в виде объекта. Это позволяет применить расширенные настройки к методу.
            // https://docs.cypress.io/api/commands/route.html#Options
            method: 'POST',
            url: '**/merchant/current/projects/*/components/subscriptions/test',
            status: 200,
            response: 'fx:subscriptions/test_response.json',
            delay: 300,
            headers: {}
        }).as('test_request'); //пример загрузки события запроса роута в переменную, для дальнецшей обработки.
    });

    it(Cypress.spec.name,  function () { //cypress использует mocha для семантиечской организации тестов
        //https://docs.cypress.io/guides/references/bundled-tools.html#Mocha
        cy.visit(`/${Cypress.env('merchant')}/projects/${Cypress.env("project")}/edit/webhooks`); //cypress имеет хорошую систему поиска, любое апи можно без проблем найти поиском в документации
        // пример запроса по слову visit: visit https://docs.cypress.io/api/commands/visit.html#Syntax
        cy.get('.ui-navigation__section').contains('Subscriptions').click(); //cypress позволяет объединять команды в цепочки для более удобного написанич сценариев.
        //test webhook
        cy.get('[data-id="user_id"]')
            .clear()
            .type('11111')
            .should('have.value', '11111');
        cy.get('[data-id="invoice_id"]')
            .clear()
            .type('11111')
            .should('have.value', '11111');
        cy.get('[data-id="amount"]')
            .clear()
            .type('11111')
            .should('have.value', '11111');
        //Currency dropdown
        cy.get('[data-id="currency"]').click();
        cy.get('[data-id="search"]').type('USD').should('have.value', 'USD');
        cy.get('.xsui-dropdown__item[data-value="USD"]').click();
        //Plan ID  dropdown
        cy.get('[data-id="plan_id"]').click();
        cy.get('.xsui-dropdown__item').click();
        //////////
        cy.get('[data-id="product_id"]')
            .clear()
            .type('11111')
            .should('have.value', '11111');
        cy.get('[data-id="foreign_invoice"]')
            .clear()
            .type('11111')
            .should('have.value', '11111');

        cy.get('.webhooks-block__test-forms-container [type="submit"]').click();
        cy.wait('@test_request') // обработка события запроса к роуту. Мы можем без проблем валидировать исходящий запрос от приложения, и сравнить его с эталонной фикстурой.
            .then(route=>{ //к сожалению, cypress целиком основан на собственной очереди колманд, что значит, асинхронные функции ECMAscript 2017 нам недоступны.
                // Но мы попрожнему можем использовать метод .then для привязки к асинхронным методам cypress
                let request = route.request.body;// сохраняем запрос в переменную для дальнейшего использония
                let request_fixture = this.test_request_json;// сохраняем фиксиуру в переменную. Фикстура автоматически парсится и превращается в javascript объект
                cy.log(request);//данные можно наглядно просмотреть в devtools браузера https://docs.cypress.io/api/commands/log.html#Syntax
                cy.log(request_fixture); //Данные, определенные в методе before, доступны в объекте this, при исполнении тестового кода https://docs.cypress.io/api/commands/as.html#Fixture
                expect(request).to.deep.equal(request_fixture);//cypress автометически внедряет пакет chai. Используем его для глубогого сравнения объектов запроса и эталонной фикстуры запроса. https://docs.cypress.io/guides/references/assertions.html#Chai
            });
        cy.get('.submit-status--success');  //фронтэнд сигнализирует об успешной процедуре тестинга пакета
    })
});