describe('Use of different Locator Strategies', () => {
    it('Practice Elements - Text boxes', () => {
        cy.visit('https://the-internet.herokuapp.com/login');
        cy.get('input[name="username"]').type('tomsmith');
        cy.get('input[name="password"]').type('SuperSecretPassword!');
        cy.get('button[type="submit"]').click();
        cy.get('#flash').should("contain.text", "You logged into a secure area!");
    });

    it('Practice Elements - Checkboxes', () => {
        cy.visit('https://the-internet.herokuapp.com/checkboxes');
        cy.xpath('(//input[@type="checkbox"])[1]').check();
        cy.xpath('(//input[@type="checkbox"])[2]').should("have.attr","checked");
        cy.xpath('(//input[@type="checkbox"])[2]').uncheck();

    });

    it('Practice Elements - Dropdowns', () => {
        cy.visit('https://the-internet.herokuapp.com/dropdown');
        cy.get('#dropdown').select('Option 1').should('have.value', '1');
        cy.get('#dropdown').select('2').should('have.value', '2');
        cy.get('#dropdown option:selected').should('contain', 'Option 2');

    });

    it('Practice Elements - Links', () => {
        cy.visit('https://the-internet.herokuapp.com/redirector');
        cy.get('#redirect').click();
        cy.url().should('include', '/status_codes');
    });

});
