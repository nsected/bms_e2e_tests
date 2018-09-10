#!/usr/bin/env bash
rm -rf report
npx cypress run  --spec 'cypress/integration/publisher/store/game-keys/**/*' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa
#npx cypress run  --spec 'cypress/integration/service/login.js' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa
#npx cypress run  --spec 'cypress/integration/publisher/store/game-keys/**/*' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa &
#npx cypress run  --spec 'cypress/integration/publisher/store/subscriptions/**/*' --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa &
#wait
#npx cypress run  --spec 'cypress/integration/publisher/store/virtual-currency/**/*'  --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa &
#npx cypress run  --spec 'cypress/integration/publisher/store/virtual-items/**/*'  --record --key 1cda45fb-63b2-4a42-ae9c-6cf3eb6a58aa &
#wait

