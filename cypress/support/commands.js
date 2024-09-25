// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('launchApp' , () => {
    cy.visit('https://www.amazon.com/');
})


Cypress.Commands.add('login', (email, password) => {
    // Step 1: Launch Amazon Website
    cy.visit('https://www.amazon.com/');

    // Step 2: Perform Sign in
    cy.get('#nav-link-accountList-nav-line-1').trigger('mouseover');
    cy.xpath('(//span[@class="nav-action-inner"])[1]').click();

    // Step 3: Enter Email and click continue
    cy.get('#ap_email').type(email);
    cy.get('#continue').click();

    // Step 4: Enter Password and click Sign in
    cy.get('#ap_password').type(password);
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
});