describe('Handling dynamic content ', () => {

    it('Should detect changes in dynamic content after page reload', () => {
        // Visit the dynamic content page
        cy.visit('https://the-internet.herokuapp.com/dynamic_content');

        // Store the initial content from the first dynamic element
        cy.get('#content .row div .large-10').eq(2).invoke('text').as('initialContent');

        cy.get('@initialContent').then((initialContent) => {
            // Reload the page
            cy.xpath('//a[@href="/dynamic_content?with_content=static"]').click({force:true});

            // Get the content after reload and compare with the initial content
            cy.get('#content .row div .large-10').eq(2).invoke('text').should('not.eq', initialContent);
        });
    });

    it('Should check that dynamic content changes across multiple reloads', () => {
        const contentArray = [];

        // Reload the page multiple times and verify content changes
        for (let i = 0; i < 3; i++) {
            // Visit or reload the page
            cy.visit('https://the-internet.herokuapp.com/dynamic_content');

            // Store the text content in an array
            cy.get('#content .row:first-child .large-10').invoke('text').then((textContent) => {
                contentArray.push(textContent);

                // Ensure that the current content is unique compared to previous entries
                if (i > 0) {
                    expect(contentArray[i]).to.not.eq(contentArray[i - 1]);
                }
            });
        }
    });
});
