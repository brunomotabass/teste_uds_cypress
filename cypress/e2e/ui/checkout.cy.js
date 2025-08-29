/// <reference types="cypress" />

import { LoginPage } from '../../support/pages/login-page';
import { InventoryPage } from '../../support/pages/inventory-page';
import { CartPage } from '../../support/pages/cart-page';
import { CheckoutPage } from '../../support/pages/checkout-page';

describe('SauceDemo Checkout Tests', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  
  beforeEach(() => {
    loginPage.visit();
    loginPage.login('standard_user', 'secret_sauce');
    inventoryPage.addItemToCart('Sauce Labs Backpack');
    inventoryPage.goToCart();
    cartPage.goToCheckout();
  });

  it('4.5 - should complete checkout flow successfully', () => {
    checkoutPage.fillInformation('John', 'Doe', '12345');
    checkoutPage.continue();
    checkoutPage.finish();
    
    checkoutPage.getCompleteHeader()
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
  });
});