export class BasePage{

    private lbl_signIn = "#nav-link-accountList-nav-line-1";
    private lnk_signIn = "(//span[@class='nav-action-inner'])[1]";
    private txt_email = "#ap_email";
    private btn_continue = "#continue";
    private txt_password = "#ap_password";
    private btn_submit =  "#signInSubmit";
    private lnk_skipNow =  "#ap-account-fixup-phone-skip-link";


    constructor() {
    }

    public step_clickSignIn(){
        cy.get(this.lbl_signIn).trigger('mouseover');
        // @ts-ignore
        cy.xpath(this.lnk_signIn).click();
        return this;
    }

    public step_enterEmail(email: string){
        cy.get(this.txt_email).type(email);
        cy.get(this.btn_continue).click();
        return this;
    }

    public step_enterPassword(password: string){
        cy.get(this.txt_password).type(password);
        cy.get(this.btn_submit).click();
        return this;
    }

    public step_skipPhoneVerification(){
        cy.get('body').then(($body) => {
            if ($body.find(this.lnk_skipNow).length > 0) {
                cy.get(this.lnk_skipNow).click();
            } else {
                cy.log('Skip link is not present, moving on...');
            }
        });
        return this;
    }

    //Home page
    public verify_homepageLoaded(expectedUrl:string){
        cy.url().should('include', expectedUrl);
        return this;
    }

    public verify_successfulSignIn(username:string){
        cy.get('#nav-link-accountList-nav-line-1').should('contain.text', username);
        return this;
    }

    public step_searchForProduct(searchText: string){
        cy.get('#twotabsearchtextbox').type(searchText);
        return this;
    }

    public step_clickOnSearchItem(){
        cy.get('#nav-search-submit-button').click();
        return this;
    }

    //Product Page
    public verify_searchedItemDetailView(){
        // @ts-ignore
        cy.xpath('(//span[@class="a-size-medium a-color-base a-text-normal"])[1]').invoke('text').then((productTitleFromListView: string) => {
            // @ts-ignore
            cy.xpath('(//span[@class="a-size-medium a-color-base a-text-normal"])[1]').click();
            cy.get('#productTitle').invoke('text').then((productTitleFromDetailView) => {
                expect(productTitleFromListView.trim()).to.equal(productTitleFromDetailView.trim());
            });
        });
        return this;
    }

    public step_clickOnQuantityDropdown(){
        cy.get('#a-autoid-1-announce').click({force:true});
        return this;
    }

    step_selectQuantity(value: string){
        cy.get('select#quantity').select(value, {force:true});
        cy.get('select#quantity').should('have.value', value);
        return this;
    }

    public step_clickAddToCart(){
        cy.get('#add-to-cart-button').click();
        return this;
    }
}