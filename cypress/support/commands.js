// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', (username, password) => {
  cy.get('#user-name').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
});

Cypress.Commands.add('getByDataTest', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('apiRequest', (method, url, body = null, auth = false) => {
  const options = {
    method: method,
    url: url,
    failOnStatusCode: false
  };

  if (body) {
    options.body = body;
  }

  if (auth) {
    options.headers = {
      'Authorization': `Bearer ${Cypress.env('authToken')}`
    };
  }

  return cy.request(options);
});