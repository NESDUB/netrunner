describe("Home Page", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");
  });

  it("should display the page title", () => {
    cy.get("h1").should("contain", "Next.js 3D Starter");
  });

  it("should have a 3D canvas", () => {
    cy.get("canvas").should("exist");
  });

  it("should have navigation links", () => {
    cy.get("nav").within(() => {
      cy.contains("a", "Home").should("have.attr", "href", "/");
      cy.contains("a", "About").should("have.attr", "href", "/about");
      cy.contains("a", "Contact").should("have.attr", "href", "/contact");
    });
  });
});
