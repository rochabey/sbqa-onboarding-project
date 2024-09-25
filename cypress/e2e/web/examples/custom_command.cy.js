describe('Use custom Cypress commands to simplify test cases', () => {

    it('Log into Amazon Site using custom command', () => {
        cy.login('specialuser235@gmail.com', 'Test@123'); // added in cypress/support/commands.js
        cy.url().should('include', '/?ref_=nav_signin');
        cy.get('#nav-link-accountList-nav-line-1').should('contain.text', 'rochelle');
    });
});