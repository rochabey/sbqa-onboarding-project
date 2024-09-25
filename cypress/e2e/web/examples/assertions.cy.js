describe('Cypress Assertions Examples', () => {
    it('Asserts element visibility - using class attribute', () => {
        // Step 1: Visit the Amazon homepage
        cy.visit('https://www.amazon.com/');
        // Step 2: Assert that the Amazon logo is visible - using class attribute
        cy.get('.nav-logo-link').should('be.visible');
    });

    it('Asserts text content - using id attribute', () => {
        // Step 1: Visit the Amazon homepage
        cy.visit('https://www.amazon.com/');
        // Step 2: Assert that the text - using id attribute
        cy.get('#nav-link-accountList-nav-line-1').should('have.text', 'Hello, sign in');
    });

    it('Asserts URLs and attributes', () => {
        // Step 1: Visit the Amazon homepage
        cy.visit('https://www.amazon.com/');
        // Step 2: Assert that the URL includes the amazon.com
        cy.url().should('include', 'amazon.com');
        // Step 3: Assert that the Amazon logo has href attribute
        cy.get('#nav-logo-sprites').should('have.attr', 'href', '/ref=nav_logo');
    });

    it('Asserts Element is existing', () => {
        // Step 1: Visit the Amazon homepage
        cy.visit('https://www.amazon.com/');
        // Step 2: Assert that the Search box exists
        cy.xpath('//input[@id="twotabsearchtextbox"]').should('exist');
    });
});
