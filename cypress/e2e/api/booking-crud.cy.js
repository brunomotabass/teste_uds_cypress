/// <reference types="cypress" />

describe('Restful Booker CRUD Tests', () => {
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

    // Create a booking for update/delete tests
    cy.fixture('booking-create').then((bookingData) => {
      cy.request('POST', `${API_BASE_URL}/booking`, bookingData)
        .then((response) => {
          bookingId = response.body.bookingid;
        });
    });
  });

  it('5.5 - should update booking successfully', () => {
    cy.fixture('booking-update').then((updateData) => {
      cy.request({
        method: 'PUT',
        url: `${API_BASE_URL}/booking/${bookingId}`,
        headers: {
          'Cookie': `token=${authToken}`
        },
        body: updateData
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include(updateData);
      });
    });
  });

  it('5.6 - should delete booking successfully', () => {
    cy.request({
      method: 'DELETE',
      url: `${API_BASE_URL}/booking/${bookingId}`,
      headers: {
        'Cookie': `token=${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      
      // Verify the booking is deleted
      cy.request({
        method: 'GET',
        url: `${API_BASE_URL}/booking/${bookingId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});