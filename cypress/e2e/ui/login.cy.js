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

  it('4.2 - should show error message with invalid credentials', () => {
    loginPage.login('invalid_user', 'invalid_password');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match');
    cy.url().should('include', 'saucedemo.com');
    cy.get('.inventory_list').should('not.exist');
  });
});