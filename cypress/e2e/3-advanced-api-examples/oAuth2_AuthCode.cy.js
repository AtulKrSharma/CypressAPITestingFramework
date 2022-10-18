//http://coop.apps.symfonycasts.com

describe("oAuth2.0", () => {
  //const baseURLoAuth = "http://coop.apps.symfonycasts.com";
  it("Post-Post-Put-Get", () => {
    //Auth Token-Post
    cy.api({
      url: "http://coop.apps.symfonycasts.com/authorize",
      method: "GET",
      form: true,
      body: {
        client_id: "AtulOAuthApp",
        response_type: "code",
        redirect_uri: "https://github.com/AtulKrSharma",
        grant_type: "authorization_code",
        scope:
          "barn-unlock toiletseat-down chickens-feed eggs-collect eggs-count profile",
        state: "This is CSRF dummy token",
      },
    }).as("GetoAuthToken");

    cy.get("@GetoAuthToken").then(function (respo) {
      expect(respo.status).to.equal(200);
      JSON.stringify(respo);
      //Got the Auth token
      //let tokenValue = respo.body.access_token;
      //cy.log(tokenValue);
      // return tokenValue;
    });
    // .then((tokenValue) => {
    //   //Booking created
    //   cy.api({
    //     url: baseURLoAuth + "/api/me",
    //     method: "GET",
    //     headers: {
    //       "content-type": "application/x-www-form-urlencoded",
    //       "Cache-Control": "no-cache",
    //       followRedirect: false,
    //       Authorization: "Bearer " + tokenValue,
    //     },
    //   }).as("GetUserIdbyGetCall");

    //   cy.get("@GetUserIdbyGetCall")
    //     .then((respo) => {
    //       expect(respo.status).to.equal(200);
    //       let userIdValue = respo.body.id;
    //       //cy.log(userIdValue);
    //       return userIdValue;
    //     })
    //     .then((userIdValue) => {
    //       cy.log("value of userIdValue is-->" + userIdValue);
    //       cy.api({
    //         url: baseURLoAuth + "/api/" + userIdValue + "/barn-unlock",
    //         method: "POST",
    //         headers: {
    //           Authorization: "Bearer " + tokenValue,
    //         },
    //       }).then((response) => {
    //         expect(response.status).to.equal(200);
    //         expect(response.body).to.have.property("data");
    //         expect(response.body.action).to.eq("barn-unlock");
    //         expect(response.body.success).to.eq(true);
    //         expect(response.body).to.have.property("success", true);
    //         expect(response.body).to.be.a("object");
    //       });
    //     });
    // });
  });
});