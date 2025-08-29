class InventoryPage {
  getInventoryList() {
    return cy.get('.inventory_list');
  }

  getInventoryItems() {
    return cy.get('.inventory_item');
  }

  getCartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  getSortDropdown() {
    return cy.get('[data-test="product_sort_container"]');
  }

  getMenuButton() {
    return cy.get('#react-burger-menu-btn');
  }

  getLogoutLink() {
    return cy.get('#logout_sidebar_link');
  }

  getSidebarMenu() {
    return cy.get('.bm-menu');
  }

  addItemToCart(itemName) {
    return cy.contains('.inventory_item', itemName)
      .find('button')
      .click();
  }

  removeItemFromCart(itemName) {
    return cy.contains('.inventory_item', itemName)
      .find('button')
      .contains('Remove')
      .click();
  }

  goToCart() {
    cy.get('.shopping_cart_link').click();
  }

  openMenu() {
    this.getMenuButton().click();
    // Aguarda o menu abrir completamente
    this.getSidebarMenu().should('be.visible');
  }

  logout() {
    this.openMenu();
    // Garante que o link de logout está visível antes de clicar
    this.getLogoutLink().should('be.visible').click();
  }

  sortBy(sortOption) {
    this.getSortDropdown().select(sortOption);
  }
}

export { InventoryPage };