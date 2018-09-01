const _ = require('lodash')
const cypress = require('cypress')

/*
* Add your config args to `cypress.run({...})`
* Set MAX_NUM_RUNS for number of retries
* DEFAULT_SPECS is optional, unless you want to run only specific specs
*/


const MAX_NUM_RUNS = 3
const DEFAULT_SPECS = undefined //'cypress/integration/index1.spec.js'

let totalFailuresIncludingRetries = 0

const run = (num, spec) => {
    // run once and then retry
    // up to two more times total
    num += 1

    return cypress.run({
        // pass your options here...
        spec: spec || DEFAULT_SPECS,
        browser: 'chrome',
        env: {
            numRuns: num
        }
    })
        .then((results) => {
            if (results.totalFailed) {
                totalFailuresIncludingRetries += results.totalFailed

                // rerun again with only the failed tests
                const specs = _(results.runs).filter("stats.failures").map("spec.relative").value()

                console.log(`Run #${num} failed.`)

                // if this is the 3rd total run (2nd retry)
                // and we've still got failures then just exit
                if (num >= MAX_NUM_RUNS) {
                    console.log(`Ran a total of '${MAX_NUM_RUNS}' times but still have failures. Exiting...`)
                    return process.exit(totalFailuresIncludingRetries)
                }

                console.log(`Retrying '${specs.length}' specs...`)
                console.log(specs)

                return run(num, specs)
            }
        })
}

// kick off the run with the default specs
run(0)