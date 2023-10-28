describe("create testing on sauce demo", () => {
  beforeEach(() => {
    cy.login();
  });

  it("success add item to cart", () => {
    cy.addItem(3);
    cy.get("#shopping_cart_container")
      .should("be.visible")
      .within(() => {
        cy.contains("3").should("be.visible");
      });
    cy.clickButton("Open Menu");
    cy.contains("Logout").should("be.visible").click();
    cy.get("#login_button_container").should("be.visible");
  });

  it("should be able to remove item on cart page", () => {
    cy.addItem(2);
    cy.get("#shopping_cart_container").should("be.visible").click();
    cy.contains("Your Cart").should("be.visible");
    cy.contains("Sauce Labs Backpack")
      .parents(".cart_item")
      .should("be.visible")
      .within(() => {
        cy.clickButton("Remove");
      });
    cy.get(".cart_item").should("have.length", 1);
  });

  it("Should be able to checkout item", () => {
    cy.addItem(3);
    cy.get("#shopping_cart_container").should("be.visible").click();
    cy.contains("Checkout").should("be.visible").click();
    cy.contains("Checkout: Your Information").should("be.visible");
    cy.get("#first-name").should("be.visible").type("andre");
    cy.get("#last-name").should("be.visible").type("batista");
    cy.get("#postal-code").should("be.visible").type("23093");
    cy.contains("Continue").should("be.visible").click();
    cy.contains("Checkout: Overview").should("be.visible");
    // Calculate the total price
    let totalPrice = 0;
    cy.get(".cart_item")
      .each(($cartItem) => {
        const priceText = $cartItem
          .find(".inventory_item_price")
          .text()
          .replace("$", "");
        const price = parseFloat(priceText);
        totalPrice += price;
      })
      .then(() => {
        const taxRate = 0.08;
        const taxAmount = totalPrice * taxRate;
        const totalPriceWithTax = totalPrice + taxAmount
         // Assert that the displayed total price with tax matches the calculated total
        cy.get(".summary_total_label").should(
          "have.text",
          `Total: $${totalPriceWithTax.toFixed(2)}`
        );
      });
      cy.contains("Finish").should('be.visible').click()
      cy.contains('Thank you for your order')
      cy.url().should('include','checkout-complete')
  });
});
