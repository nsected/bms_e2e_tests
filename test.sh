#!/usr/bin/env bash
set -e
rm -rf videos/
node cypress/plugins/setvars.js
#npx cypress run  --spec 'cypress/integration/service/login.js'
npx cypress run  --spec 'cypress/integration/publisher/store/game-keys/test.js' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa &
npx cypress run  --spec 'cypress/integration/publisher/store/subscriptions/**/*' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa &
wait
npx cypress run  --spec 'cypress/integration/publisher/store/virtual-currency/**/*' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa &
npx cypress run  --spec 'cypress/integration/publisher/store/virtual-items/**/*' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa &
wait