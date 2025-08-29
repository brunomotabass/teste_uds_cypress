class LoginPage {
  visit() {
    cy.visit('/');
  }

  getUsernameField() {
    return cy.get('#user-name');
  }

  getPasswordField() {
    return cy.get('#password');
  }

  getLoginButton() {
    return cy.get('#login-button');
  }

  getError() {
    return cy.get('[data-test="error"]');
  }

  login(username, password) {
    this.getUsernameField().type(username);
    this.getPasswordField().type(password);
    this.getLoginButton().click();
  }
}

export { LoginPage };