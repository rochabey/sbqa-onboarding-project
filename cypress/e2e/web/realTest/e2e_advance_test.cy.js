import * as elements from "../../../object-repository/pages/pageObjects.json";
import * as testdata from "../../../fixtures/testdata.json";

describe('Objects repo - E2E test scenario - real world test', () => {
    it('Verify User can login to Amazon, search for a product and add to cart', () => {

        cy.login(testdata.email,testdata.password); //Custom commands

        cy.url().should('include', '/?ref_=nav_signin');

        cy.get(elements.SignInPage.lbl_signIn).should('contain.text', testdata.username);

        cy.get(elements.HomePage.txt_searchBox).type(testdata.searchText);
        cy.get(elements.HomePage.btn_search).click();

        cy.xpath(elements.SearchResultPage.ele_resultItem).invoke('text').
        then((productTitleFromListView) => {
            cy.xpath(elements.SearchResultPage.ele_resultItem).click();
            cy.get('#productTitle').invoke('text').
            then((productTitleFromDetailView) => {
                expect(productTitleFromListView.trim()).to.equal(productTitleFromDetailView.trim());
            });
        });

        cy.xpath(elements.ProductDetailPage.dd_quantity).click({force:true});
        cy.get(elements.ProductDetailPage.dd_selectQuantity).select('1', {force:true});

        cy.get(elements.ProductDetailPage.dd_selectQuantity).should('have.value', '1');

        cy.get(elements.ProductDetailPage.btn_addToCart).click();

    });
});