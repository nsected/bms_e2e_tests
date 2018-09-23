#!/usr/bin/env bash
rm -rf report #очищаем папку с отчетом
rm -rf tmp #очищаем временную папку
mkdir -p tmp # временная папка
echo "{}" > tmp/cookies.json #создаем пустой файл cookies
npx cypress run  --spec 'cypress/integration/service/login.js'
npx cypress run  --spec 'cypress/integration/publisher/store/subscriptions/**/*' &
npx cypress run  --spec 'cypress/integration/service/error.js' &
wait
sleep 2
rm report/*.html # очищаем ненужные html отчеты
node merge-reports.js # мержим json отчеты в один файл. На данный момент используется самописный скрипт для мержа отчетов.
npx marge report/report.json -o report # генерируем html файл для визуального просмотра отчета
#мы можем использовать систему отчетов cypress dashboard
#cypress использует сложную систему синхронизации на основе проприетарного сервиса dashboard для паралельного исполнения тестов,
# но нам доступно простейшее выполнение процесса cypress параллельно, с разным набором тест-кейсов.
# на данный момент cypress позволет использовать проприетарную систему отчетов бесплатно
