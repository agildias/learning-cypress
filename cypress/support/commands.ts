/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * use this function for simple login
       * @example
       * cy.login('a','b') 
       * 
       */
      login(username: string, password: string);
      /**
       * you can use this function on tag <button> for simple click
       * @example cy.clickButton('Submit')
       */
      clickButton(buttonName);
      /**
       *  this simple function for add item to cart
       * @example cy.addItem(2)
       */
      addItem(addFromItemList)
    }
  }
}
Cypress.Commands.add("clickButton", (buttonName) => {
  cy.contains("button", buttonName)
    .should("be.visible")
    .should("be.enabled")
    .click();
});

Cypress.Commands.add(
  "login",
  (username = "standard_user", password = "secret_sauce") => {
    cy.visit("/");
    cy.get('[data-test="username"]').should("be.visible").type(username);
    cy.get('[data-test="password"]').should("be.visible").type(password);
    cy.get('[name="login-button"]').should("be.visible").click();
  }
);

Cypress.Commands.add("addItem", (addFromItemList) => {
  let max = addFromItemList;
  cy.get(".inventory_item").each(($ele , index) => {
    if (index < max) {
    cy.wrap($ele).find("button").contains("Add to cart").click();
    }
  });
});
export { };

