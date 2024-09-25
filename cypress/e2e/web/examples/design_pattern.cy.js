import * as testdata from "../../../fixtures/testdata.json";
import {BasePage} from "../../../object-repository/functions/BasePage";
const basePage = new BasePage();

describe('E2E test scenario - real world test', () => {
    it('Verify User can login to Amazon', () => {

        cy.launchApp();
        basePage.step_clickSignIn().
        step_enterEmail(testdata.email).
        step_enterPassword(testdata.password).
        step_skipPhoneVerification().
        verify_homepageLoaded(testdata.expectedUrl).
        verify_successfulSignIn(testdata.username);
    });
});