/// <reference types="cypress" />

import { LoginPage } from '../../support/pages/login-page';

describe('SauceDemo Login Tests', () => {
  const loginPage = new LoginPage();
  
  beforeEach(() => {
    loginPage.visit();
  });

  it('4.1 - should login successfully with valid credentials', () => {
    loginPage.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });
});
