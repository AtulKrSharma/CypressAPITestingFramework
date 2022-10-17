//https://restful-booker.herokuapp.com/apidoc/index.html

describe("PUT", () => {
  const baseURL = "https://restful-booker.herokuapp.com";
  it("Post-Post-Put-Get", () => {
    //Auth Token-Post
    cy.api({
      url: baseURL + "/auth",
      method: "POST",
      body: {
        username: "admin",
        password: "password123",
      },
      headers: {
        "content-type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache",
        followRedirect: false, // turn off following redirects
      },
    }).as("GetAuthTokenByPostCall");

    cy.get("@GetAuthTokenByPostCall")
      .then(function (respo) {
        expect(respo.status).to.equal(200);
        //Got the Auth token
        let tokenValue = respo.body.token;
        return tokenValue;
      })
      .then((tokenValue) => {
        //Booking created
        cy.api({
          url: baseURL + "/booking",
          method: "POST",
          body: {
            firstname: "Atulx",
            lastname: "Kumarx",
            totalprice: 168,
            depositpaid: true,
            bookingdates: {
              checkin: "2018-11-01",
              checkout: "2019-12-01",
            },
            additionalneeds: "Breakfasto",
          },
          headers: {
            "content-type": "application/json; charset=utf-8",
            "Cache-Control": "no-cache",
            followRedirect: false, // turn off following redirects
            Cookie: "token=" + tokenValue,
          },
        }).as("BookingCreatedByPostCall");

        cy.get("@BookingCreatedByPostCall")
          .then((respo) => {
            expect(respo.status).to.equal(200);
            let bookingIdValue = respo.body.bookingid;
            return bookingIdValue;
          })
          .then(function (bookingIdValue) {
            cy.log("value of token is-->" + tokenValue);
            //Booking updated
            cy.api({
              url: baseURL + "/booking/" + bookingIdValue,
              method: "PUT",
              body: {
                firstname: "Lucky",
                lastname: "Bhardwaj",
                totalprice: 21218,
                depositpaid: false,
                bookingdates: {
                  checkin: "2018-01-01",
                  checkout: "2019-02-01",
                },
                additionalneeds: "dosa, chai, mocha",
              },
              headers: {
                "content-type": "application/json; charset=utf-8",
                "Cache-Control": "no-cache",
                followRedirect: false, // turn off following redirects
                Cookie: "token=" + tokenValue,
              },
            }).as("BookingUpdatedByPutCall");

            cy.get("@BookingUpdatedByPutCall")
              .then((respo) => {
                expect(respo.status).to.equal(200);
              })
              .then(() => {
                cy.api({
                  url: baseURL + "/booking/" + bookingIdValue,
                  method: "GET",
                  headers: {
                    "content-type": "application/json; charset=utf-8",
                    "Cache-Control": "no-cache",
                    followRedirect: false, // turn off following redirects
                    Cookie: "token=" + tokenValue,
                  },
                }).as("GetBookingByGetCall");

                cy.get("@GetBookingByGetCall").then((respo) => {
                  expect(respo.status).to.equal(200);

                  expect(respo.body).to.have.property("firstname", "Lucky");
                  expect(respo.body).to.have.property("lastname", "Bhardwaj");
                  expect(respo.body).to.have.property("depositpaid", false);
                  expect(respo.body).to.have.property(
                    "additionalneeds",
                    "dosa, chai, mocha"
                  );
                });
              });
          });
      });
  });
});
