describe('E2E test scenario - real world test', () => {
    it('Verify User can login to Amazon, search for a product and add to cart', () => {

        // Step 1: Launch Amazon Website
        cy.visit('https://www.amazon.com/');

        // Step 2: Perform Sign in
        cy.get('#nav-link-accountList-nav-line-1').trigger('mouseover');
        cy.xpath('(//span[@class="nav-action-inner"])[1]').click();

        // Step 3: Enter Email and click continue
        cy.get('#ap_email').type('specialuser235@gmail.com');
        cy.get('#continue').click();

        // Step 4: Enter Password and click Sign in
        cy.get('#ap_password').type('Test@123');
        cy.get('#signInSubmit').click();

        // Step 5: Check if the 'Skip now' link is present and conditionally click
        cy.get('body').then(($body) => {
            // Check if the element is present in the DOM
            if ($body.find('#ap-account-fixup-phone-skip-link').length > 0) {
                // Element is present, click on it
                cy.get('#ap-account-fixup-phone-skip-link').click();
            } else {
                // Element is not present, log the information or skip
                cy.log('Skip link is not present, moving on...');
            }
        });

        // Step 6 : Validate URL
        cy.url().should('include', '/?ref_=nav_signin');

        // Step 7 : Validate successful signin by logged-in username
        cy.get('#nav-link-accountList-nav-line-1').should('contain.text', 'rochelle');

        // Step 8 : Enter Product name in Search box
        cy.get('#twotabsearchtextbox').type('iphone 11 case');
        cy.get('#nav-search-submit-button').click();

        // Step 9 : Extract the 1st search result name
        cy.xpath('(//span[@class="a-size-medium a-color-base a-text-normal"])[1]').invoke('text').then((productTitleFromListView) => {

            // Step 10 : Click on result and open detail view
            cy.xpath('(//span[@class="a-size-medium a-color-base a-text-normal"])[1]').click();

            // Step 11: Get the product title from the detail view
            cy.get('#productTitle').invoke('text').then((productTitleFromDetailView) => {

                // Step 12: Compare both titles and assert that they are equal
                expect(productTitleFromListView.trim()).to.equal(productTitleFromDetailView.trim());
            });
        });

        // Step 13: Select value "1" from the dropdown with id="quantity"
        cy.get('#a-autoid-1-announce').click({force:true});
        cy.get('select#quantity').select('1', {force:true});

        // Step 14: Optionally, assert the value was selected
        cy.get('select#quantity').should('have.value', '1');

        // Step 15: Click Add to cart
        cy.get('#add-to-cart-button').click();

    });
});