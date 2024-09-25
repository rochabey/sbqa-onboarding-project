describe('Basic Concepts Sample tests', () => {
    it('Visit a website and check its title', () => {
        cy.visit('https://the-internet.herokuapp.com/');
        cy.get('h1').should('contain.text', 'Welcome to the-internet');
        cy.get('h2').should('contain.text', 'Available Examples');
    });

    it('Use of different commands - validate using should()', () => {
        cy.visit('https://the-internet.herokuapp.com/');
        cy.contains('Add/Remove Elements').click();
        cy.get('button').contains('Add Element').click();
        cy.get('button').contains('Delete').should('be.visible');
    });

    it('Use of different commands - validate using assert()' , () => {
        cy.visit('https://the-internet.herokuapp.com/');
        cy.contains('Add/Remove Elements').click();
        cy.get('button').contains('Add Element').click();
        cy.get('button').contains('Delete').then(($btn) => {
            assert.isTrue($btn.is(':visible'), 'Delete button is visible');
        });
    });

    it('Use of different commands - validate using expect()', () => {
        cy.visit('https://the-internet.herokuapp.com/');
        cy.contains('Add/Remove Elements').click();
        cy.get('button').contains('Add Element').click();
        cy.get('button').contains('Delete').then(($btn) => {
            expect($btn).to.be.visible;
        });
    });
});
