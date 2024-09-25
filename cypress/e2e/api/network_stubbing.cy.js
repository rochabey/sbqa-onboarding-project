describe('API Authentication and Booking Update Test', () => {
    let authToken; // Variable to store the token
    let bookingId; //Variable to store booking id

    it('POST - should authenticate successfully and store the token', () => {
        cy.request({
            method: 'POST',
            url: `/auth`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: 'admin',
                password: 'password123'
            }
        }).then((response) => {
            // Assert the response status code
            expect(response.status).to.eq(200);
            // Assert the response body has the expected properties
            expect(response.body).to.have.property('token');

            // Store the token for later use
            authToken = response.body.token;
        });
    });

    it('POST - should create a new booking', () => {

        //Example of using fixtures for API testing
        cy.fixture('createBooking').then((newBookingDetails) => {

            cy.request({
                method: 'POST',
                url: '/booking', // Use the relative URL for creating a booking
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': `token=${authToken}` // Use the token in the cookie header
                },
                body: newBookingDetails
            }).then((response) => {
                // Assert the response status code
                expect(response.status).to.eq(200);

                // Validate the presence of bookingid
                expect(response.body).to.have.property('bookingid');

                // Validate the booking object properties individually
                expect(response.body).to.have.property('booking');

                const booking = response.body.booking;

                // Validate each property
                expect(booking).to.have.property('firstname', newBookingDetails.firstname);
                expect(booking).to.have.property('lastname', newBookingDetails.lastname);
                expect(booking).to.have.property('totalprice', newBookingDetails.totalprice);
                expect(booking).to.have.property('depositpaid', newBookingDetails.depositpaid);
                expect(booking.bookingdates).to.have.property('checkin', newBookingDetails.bookingdates.checkin);
                expect(booking.bookingdates).to.have.property('checkout', newBookingDetails.bookingdates.checkout);
                expect(booking).to.have.property('additionalneeds', newBookingDetails.additionalneeds);

                // Store the booking ID for later use
                bookingId = response.body.bookingid;
            });
        });
    });

    it('GET - should get bookings by firstname and lastname using query parameters', () => {
        const queryParams = {
            firstname: 'Roch',
            lastname: 'Abey'
        };

        cy.request({
            method: 'GET',
            url: '/booking', // Base URL, query params will be added
            qs: queryParams // This will automatically encode the query parameters
        }).then((response) => {
            // Assert the response status code
            expect(response.status).to.eq(200);

            // Validate that the response is an array
            expect(response.body).to.be.an('array');

            // Ensure the array is not empty
            expect(response.body.length).to.be.greaterThan(0);

            // Validate each object in the array has a bookingid
            response.body.forEach((booking) => {
                expect(booking).to.have.property('bookingid').that.is.a('number');
            });

        });
    });

    it('PUT - should update booking details using the token', () => {
        const updatedBookingDetails = {
            firstname: "James",
            lastname: "Brown",
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: "2018-01-01",
                checkout: "2019-01-01"
            },
            additionalneeds: "Breakfast"
        };

        cy.request({
            method: 'PUT',
            url: `/booking/${bookingId}`, // Use the specific booking ID
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${authToken}` // Use the token in the cookie header
            },
            body: updatedBookingDetails
        }).then((response) => {
            // Assert the response status code
            expect(response.status).to.eq(200);

            // Validate each property
            expect(response.body).to.have.property('firstname', updatedBookingDetails.firstname);
            expect(response.body).to.have.property('lastname', updatedBookingDetails.lastname);
            expect(response.body).to.have.property('totalprice', updatedBookingDetails.totalprice);
            expect(response.body).to.have.property('depositpaid', updatedBookingDetails.depositpaid);
            expect(response.body.bookingdates).to.have.property('checkin', updatedBookingDetails.bookingdates.checkin);
            expect(response.body.bookingdates).to.have.property('checkout', updatedBookingDetails.bookingdates.checkout);
            expect(response.body).to.have.property('additionalneeds', updatedBookingDetails.additionalneeds);
        });
    });

    it('PATCH - should partially update the booking details using the token', () => {
        const partialUpdateDetails = {
            firstname: "John",
            lastname: "Smith"
        };

        cy.request({
            method: 'PATCH',
            url: `/booking/${bookingId}`, // Use the booking ID from the previous tests
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${authToken}` // Use the token in the cookie header
            },
            body: partialUpdateDetails
        }).then((response) => {
            // Assert the response status code
            expect(response.status).to.eq(200);

            // Validate the updated properties
            expect(response.body).to.have.property('firstname', partialUpdateDetails.firstname);
            expect(response.body).to.have.property('lastname', partialUpdateDetails.lastname);
            expect(response.body).to.have.property('totalprice'); // Check if it still exists
            expect(response.body).to.have.property('depositpaid'); // Check if it still exists
            expect(response.body).to.have.property('bookingdates'); // Check if it still exists
            expect(response.body).to.have.property('additionalneeds'); // Check if it still exists

        });
    });

    it('GET - should get a booking by booking ID', () => {

        cy.request({
            method: 'GET',
            url: `/booking/${bookingId}` // Replace {bookingid} with actual ID
        }).then((response) => {
            expect(response.status).to.eq(200);

            const booking = response.body;  // Validate the structure and values of the response body
            expect(booking).to.have.property('firstname');
            expect(booking).to.have.property('lastname');
            expect(booking).to.have.property('totalprice');
            expect(booking).to.have.property('depositpaid');
            expect(booking).to.have.property('bookingdates');
            expect(booking.bookingdates).to.have.property('checkin');
            expect(booking.bookingdates).to.have.property('checkout');
            expect(booking).to.have.property('additionalneeds');
        });
    });

    it('DELETE - should delete the booking by ID', () => {

        cy.request({
            method: 'DELETE',
            url: `/booking/${bookingId}`, // Booking ID to be deleted
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${authToken}` // Include the auth token in the request
            }
        }).then((response) => {
            expect(response.status).to.eq(201);

            // Optionally, confirm that the booking no longer exists by making a GET request
            cy.request({
                method: 'GET',
                url: `/booking/${bookingId}`,
                failOnStatusCode: false // Do not fail the test if the booking is not found
            }).then((getResponse) => {
                expect(getResponse.status).to.eq(404);
            });
        });
    });

});
