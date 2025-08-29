/// <reference types="cypress" />

import { LoginPage } from '../../support/pages/login-page';
import { InventoryPage } from '../../support/pages/inventory-page';

describe('SauceDemo Logout Tests', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  
  beforeEach(() => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');
    // Aguarda a página carregar completamente
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible');
  });

  it('4.7 - should logout successfully', () => {
    inventoryPage.openMenu();
    
    // Verifica se o link de logout está visível antes de clicar
    inventoryPage.getLogoutLink()
      .should('be.visible')
      .and('contain.text', 'Logout')
      .click();
    
    // Verifica que foi redirecionado para a página de login
    cy.url().should('include', 'saucedemo.com');
    cy.get('#user-name').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#login-button').should('be.visible');
    cy.get('.inventory_list').should('not.exist');
  });
});