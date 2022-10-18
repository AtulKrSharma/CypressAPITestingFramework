//http://coop.apps.symfonycasts.com

describe("oAuth2.0", () => {
  const baseURLoAuth = "http://coop.apps.symfonycasts.com";
  it("Post-Get", () => {
    cy.api({
      url: baseURLoAuth + "/authorize",
      method: "GET",
      query: {
        client_id: "NanaZomato",
        client_secret: "41b217bac8cf379c6319ab5dee980f5d",

        response_type: "code",
        redirect_uri: "https://github.com/AtulKrSharma",
        grant_type: "authorization_code",
        scope:
          "barn-unlock toiletseat-down chickens-feed eggs-collect eggs-count profile",
        state: "ThisisCSRFdummytoken",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    JSON.stringify(response.body);
     // hi, I'm on github.com
  });
});
