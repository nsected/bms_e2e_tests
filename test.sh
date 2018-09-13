#!/usr/bin/env bash
rm -rf report
mkdir -p tmp
echo "{}" > tmp/cookies.json
npx cypress run  --spec 'cypress/integration/service/login.js' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa
npx cypress run  --spec 'cypress/integration/publisher/**/*'  --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa
sleep 2
rm report/*.html && node merge-reports.js && npx marge report/report.json -o report