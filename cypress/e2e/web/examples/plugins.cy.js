describe('Use of Cypress Plugins', () => {

    /**
     * You need to install a plugin here
     * Run the following command to install the plugin => npm install --save-dev cypress-file-upload
     * In your cypress/support/e2e.js file, include the following line to import the plugin => import 'cypress-file-upload';
     */

    it('Practice Elements - File Upload', () => {
        cy.visit('https://the-internet.herokuapp.com/upload');
        const filePath = 'exampleFile.txt'; // Ensure this file exists in cypress/fixtures
        cy.get('#file-upload').attachFile(filePath);
        cy.get('#file-submit').click();
        cy.get('#uploaded-files').should('contain.text', 'exampleFile.txt');
        cy.get('h3').should('contain.text', 'File Uploaded!');
    });

    it('Practice Elements - File Download', () => {
        cy.visit('https://the-internet.herokuapp.com/download');
        // Get the first file link and verify that it exists
        cy.get('div.example a').first().should('have.attr', 'href').then((downloadLink) => {
            // Verify that the download link is valid
            expect(downloadLink).to.contain('download/');

            // Trigger the download by visiting the download link
            cy.request({
                url: `https://the-internet.herokuapp.com/${downloadLink}`,
                method: 'GET',
                encoding: 'binary', // To handle the file's binary data
            }).then((response) => {
                // Verify that the response status is 200 (OK)
                expect(response.status).to.eq(200);

                // Optionally, check that the response contains valid content for a file
                expect(response.body).to.not.be.null;
            });
        });
    });
});
