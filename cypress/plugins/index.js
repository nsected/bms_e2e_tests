// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)



const path = require('path');
if (!process.env.PWD) {
    process.env.PWD = process.cwd(); //фикс для винды
}

module.exports = (on, config) => {
    //мы можем определять собственные хуки, с привязкой к событиям cypress
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  //   config.env.cookies = JSON.stringify(require(path.join(process.env.PWD, '/tmp/cookies.json')));
  //   console.log(config.env); // see what all is in here!

    // modify config values

    // modify env var value

    // return config
    return config
}
