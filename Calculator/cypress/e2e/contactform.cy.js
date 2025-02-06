describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit("/contactform");
  });

  it("disables submit button when fields are empty", () => {
    cy.get("button[type='submit']").should("be.disabled");
  });

  // Form validation scenario
  it("enables submit button when all fields are filled", () => {
    cy.get("input[type='text']").first().type("Jonathan");
    cy.get("input[type='text']").eq(1).type("jonathan@gmail.com");
    cy.get("input[type='text']").eq(2).type("Nice!");
    cy.get("button[type='submit']").should("not.be.disabled");
  });

  // Succesful submission scenario
  it("server responds on successful submission", () => {
    cy.get("input[type='text']").first().type("Jonathan");
    cy.get("input[type='text']").eq(1).type("jonathan@gmail.com");
    cy.get("input[type='text']").eq(2).type("Nice!");

    cy.get("button[type='submit']").click();

    cy.get("#subConfirmation")
  })

  
})