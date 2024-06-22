/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    // Visit the registration page
    cy.visit("/en/login");
  });

  it("should login user", () => {
    // Fill out the registration form
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('input[name="password"]').type("Password123@_@");

    // Submit the form
    cy.get("form").submit();

    // Check for success message or redirection
    cy.url().should("include", "email-confirmation"); // Adjust based on your app's behavior
  });

  it("should show error for wrong password", () => {
    // Fill out the registration form with an existing email
    cy.get('input[name="email"]').type("existinguser@example.com");
    cy.get('input[name="password"]').type("Password123@_@_lol");

    // Submit the form
    cy.get("form").submit();

    // Check for error message
    cy.contains("Неверный пароль").should("be.visible"); // Adjust based on your app's behavior
  });
});
