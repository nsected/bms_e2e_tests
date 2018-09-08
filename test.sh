#!/usr/bin/env bash
set -e
rm -rf cypress/videos/
rm -rf cypress/screenshots/
node cypress/plugins/setvars.js
npx cypress run  --spec 'cypress/integration/service/login.js' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa
#npx cypress run  --spec 'cypress/integration/publisher/store/game-keys/**/*' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa &
#npx cypress run  --spec 'cypress/integration/publisher/store/subscriptions/**/*' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa &
#wait
#npx cypress run  --spec 'cypress/integration/publisher/store/virtual-currency/**/*'  &
#npx cypress run  --spec 'cypress/integration/publisher/store/virtual-items/**/*'  &
#wait