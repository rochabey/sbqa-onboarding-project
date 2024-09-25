describe('Debugging with debug() and pause()', () => {

    it('Demonstrate the use of .debug() and .pause()', () => {
        cy.visit('https://the-internet.herokuapp.com/');
        cy.pause(); // allowing you to manually resume the test by clicking the "Resume" button in the Cypress test runner.
        cy.contains('Add/Remove Elements').click();
        cy.get('button').contains('Add Element').click().debug(); // it pauses for inspection and prints the current element in the Cypress console.
        cy.get('button').contains('Delete').should('be.visible').debug(); // Another debug to inspect the state
    });
});
