const dataJson = require("../../fixtures/post.json");

describe("Post", () => {
  const baseURL = "https://jsonplaceholder.typicode.com";

  it("CreatePost + fixtures Json", () => {
    cy.request({
      method: "POST",
      url: baseURL + "/posts",
      body: {
        title: dataJson.title,
        body: dataJson.body,
        userID: dataJson.userID,
      },
      headers: {
        "content-type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache",
        followRedirect: false, // turn off following redirects
      },
    }).as("CreatePostJSON");

    cy.get("@CreatePostJSON").then((response) => {
      cy.log(JSON.stringify(response));
      //response: status
      expect(response.status).to.equal(201);
      expect(response.status).to.eq(201);

      //response body: key only
      expect(response.body).to.have.property("userID");
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("body");
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");

      //response body: key & value
      expect(response.body).to.have.property("userID", "168");
      expect(response.body).to.have.property("title", "Luckyily");
      expect(response.body).has.property("body", "testers body");

      //response headers
      expect(response).to.include.keys("headers", "duration");
      expect(response.headers).to.have.property(
        "content-type",
        "application/json; charset=utf-8"
      );
      expect(response.headers).property("content-type").to.be.a("string");
      expect(response.headers)
        .property("X-Ratelimit-Remaining".toLowerCase())
        .to.be.a("string");

      //response body- Data Types
      expect(response.body).property("userID").to.be.a("string");
      expect(response.body).property("title").to.be.a("string");
      expect(response.body).property("body").to.be.a("string");
      expect(response.body).property("id").to.be.a("number");
    });
  });

  it("CreatePost + fixtures Json", () => {
    cy.fixture("post.json").then(function (payload) {
      cy.request({
        method: "POST",
        url: baseURL + "/posts",
        body: {
          title: payload.title,
          body: payload.body,
          userID: payload.userID,
        },
        headers: {
          "content-type": "application/json; charset=utf-8",
          "Cache-Control": "no-cache",
          followRedirect: false, // turn off following redirects
        },
      }).as("CreatePostJSON");

      cy.get("@CreatePostJSON").then((response) => {
        cy.log(JSON.stringify(response));
        //response: status
        expect(response.status).to.equal(201);
        expect(response.status).to.eq(201);

        //response body: key only
        expect(response.body).to.have.property("userID");
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("title");
        expect(response.body).to.have.property("body");
        expect(response).to.have.property("headers");
        expect(response).to.have.property("duration");

        //response body: key & value
        expect(response.body).to.have.property("userID", payload.userID);
        expect(response.body).to.have.property("title", payload.title);
        expect(response.body).has.property("body", payload.body);

        //response headers
        expect(response).to.include.keys("headers", "duration");
        expect(response.headers).to.have.property(
          "content-type",
          "application/json; charset=utf-8"
        );
        expect(response.headers).property("content-type").to.be.a("string");
        expect(response.headers)
          .property("X-Ratelimit-Remaining".toLowerCase())
          .to.be.a("string");

        //response body- Data Types
        expect(response.body).property("userID").to.be.a("string");
        expect(response.body).property("title").to.be.a("string");
        expect(response.body).property("body").to.be.a("string");
        expect(response.body).property("id").to.be.a("number");
      });
    });
  });
});
