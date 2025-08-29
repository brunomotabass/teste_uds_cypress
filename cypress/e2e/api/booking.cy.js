/// <reference types="cypress" />

describe('Restful Booker API Tests', () => {
  const API_BASE_URL = 'https://restful-booker.herokuapp.com';
  let bookingId;
  let authToken;

  before(() => {
    // Get auth token
    cy.request('POST', `${API_BASE_URL}/auth`, {
      username: 'admin',
      password: 'password123'
    }).then((response) => {
      authToken = response.body.token;
    });
  });

  it('5.1 - should create booking successfully', () => {
    cy.fixture('booking-create').then((bookingData) => {
      cy.request('POST', `${API_BASE_URL}/booking`, bookingData)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('bookingid');
          expect(response.body.bookingid).to.be.a('number');
          expect(response.body.booking).to.deep.include(bookingData);
          
          bookingId = response.body.bookingid;
        });
    });
  });

  it('5.2 - should get booking by firstname', () => {
    cy.fixture('booking-create').then((bookingData) => {
      cy.request('GET', `${API_BASE_URL}/booking?firstname=${bookingData.firstname}`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
          expect(response.body).to.satisfy((bookings) => 
            bookings.some(booking => booking.bookingid === bookingId)
          );
        });
    });
  });

  it('5.3 - should return error for invalid booking payload', () => {
    cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/booking`,
      body: {},
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it('5.4 - should return empty list for non-existent firstname', () => {
    cy.request('GET', `${API_BASE_URL}/booking?firstname=NonexistentName`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array').that.is.empty;
      });
  });
});