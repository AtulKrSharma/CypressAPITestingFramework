describe("Get-Get Iteration Call", () => {
  const baseURL = "https://dummyapi.io/";
  const appid = "6348313ab96b557182415224";

  it("CreateGetThenGet", () => {
    cy.api({
      method: "GET",
      url: baseURL + "data/v1/tag/water/post?limit=10",
      headers: {
        "content-type": "application/json; charset=utf-8",
        "app-id": appid,
      },
    })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
        expect(response.body).to.be.a("object");
        assert.typeOf(response.body.data, "array");
        let respData = response.body.data;
        return respData;
      })
      .then((respData) => {
        cy.log("Value of resp Body:->" + JSON.stringify(respData));
        expect(respData).to.be.a("array");
        expect(respData).to.be.a("array").that.is.not.empty;
        expect(respData).to.have.lengthOf.above(1);

        for (let itru of respData) {
          //cy.log(itru);
          expect(itru).to.have.property("tags");
          expect("water").to.contain.oneOf(itru.tags);
        }
      });
  });
});
