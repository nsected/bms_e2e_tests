#!/usr/bin/env bash
set -e
node cypress/plugins/setvars.js
npx cypress run  --spec 'cypress/integration/service/login.js'
npx cypress run  --spec 'cypress/integration/publisher/**/*'
