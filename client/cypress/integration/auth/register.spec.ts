/// <reference types="cypress" />

describe("Registration", () => {
  beforeEach(() => {
    // Visit the registration page
    cy.visit("/en/registration");
  });

  it("should register a new user", () => {
    // Fill out the registration form
    cy.get('input[name="username"]').type("newuser");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('input[name="password"]').type("Password123@_@");
    cy.get('input[name="passwordConfirmation"]').type("Password123@_@");

    // Submit the form
    cy.get("form").submit();

    // Check for success message or redirection
    cy.url().should("include", "dashboard"); // Adjust based on your app's behavior
    cy.contains("Welcome, newuser"); // Adjust based on your app's behavior
  });

  it("should show error for existing email", () => {
    // Fill out the registration form with an existing email
    cy.get('input[name="username"]').type("existinguser");
    cy.get('input[name="email"]').type("existinguser@example.com");
    cy.get('input[name="password"]').type("Password123@_@");
    cy.get('input[name="passwordConfirmation"]').type("Password123@_@");

    // Submit the form
    cy.get("form").submit();

    // Check for error message
    cy.contains("Email already exists").should("be.visible"); // Adjust based on your app's behavior
  });
});
