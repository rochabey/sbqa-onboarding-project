describe('Working with Fixtures data and Debugging', () => {

    // Function to Load fixture data
    before(function () {
        cy.fixture('testdata').then((credentials) => {
            this.credentials = credentials; // Store the credentials in the test context
        });
    });

    // Use of function to use fixture data in test
    it('Use fixture files to store static test data', function ()  {
        cy.visit('https://www.amazon.com/');
        cy.get('#nav-link-accountList-nav-line-1').trigger('mouseover');
        cy.xpath('(//span[@class="nav-action-inner"])[1]').click();
        cy.get('#ap_email').type(this.credentials.email); // Enter Email and click continue using fixture data
        cy.get('#continue').click();
        cy.get('#ap_password').type(this.credentials.password); // Enter Password and click Sign in using fixture data
        cy.get('#signInSubmit').click();

    });
});
