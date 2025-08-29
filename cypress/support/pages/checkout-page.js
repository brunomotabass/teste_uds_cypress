class CheckoutPage {
  getFirstNameField() {
    return cy.get('[data-test="firstName"]');
  }

  getLastNameField() {
    return cy.get('[data-test="lastName"]');
  }

  getPostalCodeField() {
    return cy.get('[data-test="postalCode"]');
  }

  getContinueButton() {
    return cy.get('[data-test="continue"]');
  }

  getFinishButton() {
    return cy.get('[data-test="finish"]');
  }

  getCompleteHeader() {
    return cy.get('.complete-header');
  }

  fillInformation(firstName, lastName, postalCode) {
    this.getFirstNameField().type(firstName);
    this.getLastNameField().type(lastName);
    this.getPostalCodeField().type(postalCode);
  }

  continue() {
    this.getContinueButton().click();
  }

  finish() {
    this.getFinishButton().click();
  }
}

export { CheckoutPage };