const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    // Configurações de timeout aumentadas
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 120000,
    responseTimeout: 30000,
    // Forçar Chrome como navegador padrão
    chromeWebSecurity: true,
    // Configurações específicas do Chrome
    userAgent: 'Chrome',
    
    setupNodeEvents(on, config) {
      // Configurar Chrome como navegador preferido
      config.browser = 'chrome';
      return config;
    },
    
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    downloadsFolder: 'cypress/downloads',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      apiUrl: 'https://restful-booker.herokuapp.com',
      // Forçar uso do Chrome
      browser: 'chrome'
    }
  },
});