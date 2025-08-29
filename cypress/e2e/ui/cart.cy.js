/// <reference types="cypress" />

import { LoginPage } from '../../support/pages/login-page';
import { InventoryPage } from '../../support/pages/inventory-page';
import { CartPage } from '../../support/pages/cart-page';

describe('SauceDemo Cart Tests', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  
  beforeEach(() => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');
  });

  it('4.3 - should add two items to cart', () => {
    inventoryPage.addItemToCart('Sauce Labs Backpack');
    inventoryPage.addItemToCart('Sauce Labs Bike Light');
    
    inventoryPage.getCartBadge().should('have.text', '2');
    
    inventoryPage.goToCart();
    cartPage.getCartItems().should('have.length', 2);
    cartPage.getCartItemByName('Sauce Labs Backpack').should('exist');
    cartPage.getCartItemByName('Sauce Labs Bike Light').should('exist');
  });

  it('4.4 - should remove item from cart', () => {
    inventoryPage.addItemToCart('Sauce Labs Backpack');
    inventoryPage.addItemToCart('Sauce Labs Bike Light');
    
    inventoryPage.goToCart();
    cartPage.removeItem('Sauce Labs Backpack');
    
    cartPage.getCartItems().should('have.length', 1);
    inventoryPage.getCartBadge().should('have.text', '1');
  });
});