describe("Get-Get Call", () => {
  const baseURL = "https://dummyapi.io/";
  const appid = "6348313ab96b557182415224";

  it("CreateGetThenGet", () => {
    cy.request({
      method: "GET",
      url: baseURL + "/data/v1/tag?limit=10",
      headers: {
        "content-type": "application/json; charset=utf-8",
        "app-id": appid,
      },
    })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.be.a("array");
        assert.typeOf(response.body.data, "array");
        let selectedTag = response.body.data[8].trim();
        return selectedTag;
      })
      .then((selectedTag) => {
        cy.log("Value of selectedTag:->" + selectedTag);
        cy.request({
          method: "GET",
          url: baseURL + "/data/v1/tag/" + selectedTag + "/post?limit=10",
          headers: {
            "content-type": "application/json; charset=utf-8",
            "app-id": appid,
          },
        }).then((response) => {
          //cy.log(JSON.stringify(response));
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("data");
          expect(response.body.data).to.be.a("array");
          assert.typeOf(response.body.data, "array");
        });
      });
  });
});
