class CartPage {
  getCartItems() {
    return cy.get('.cart_item');
  }

  getCartItemByName(itemName) {
    return cy.contains('.cart_item', itemName);
  }

  removeItem(itemName) {
    return this.getCartItemByName(itemName)
      .find('button')
      .contains('Remove')
      .click();
  }

  goToCheckout() {
    cy.get('[data-test="checkout"]').click();
  }
}

export { CartPage };