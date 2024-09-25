import * as elements from "../../../object-repository/pages/pageObjects.json";
import * as testdata from "../../../fixtures/testdata.json";

describe('E-commerce Website', () => {
    //Use of beforeEach - to login & sign in before a test runs
    beforeEach(() => {
        cy.login(testdata.email,testdata.password);
    });

    it('Loads the homepage', () => {
        cy.url().should('include', '/?ref_=nav_signin');
        cy.get(elements.SignInPage.lbl_signIn).should('contain.text', testdata.username); //test data externalized
    });

    it('Search for product', () => {
        cy.get(elements.HomePage.txt_searchBox).type(testdata.searchText);
        cy.get(elements.HomePage.btn_search).click();
    });

    afterEach(() => {
        // Cleanup code or resetting app state can be done here
    });
});
