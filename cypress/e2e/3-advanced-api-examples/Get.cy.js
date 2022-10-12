const baseURL = "https://jsonplaceholder.typicode.com";

describe("Get Call", () => {
  it("GetPostById", () => {
    cy.request(baseURL + "/posts/1").as("GetPostById");

    cy.get("@GetPostById").then((response) => {
      cy.log(JSON.stringify(response));
      //response: status
      expect(response.status).to.equal(200);
      expect(response.status).to.eq(200);

      //response body: key only
      expect(response.body).to.have.property("userId");
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("body");
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");

      //response body: key & value
      expect(response.body).to.have.property("userId", 1);
      expect(response.body).to.have.property("id", 1);
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("body");

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
      expect(response.body).property("userId").to.be.a("number");
      expect(response.body).property("id").to.be.a("number");
      expect(response.body).property("id").to.be.a("number");
      expect(response.body).property("id").to.be.a("number");

      //response body- key & value
      expect(response.body).property("title").to.contain("sunt aut facere");
      expect(response.body.title).contains("sunt aut facere");
      expect(response).property("body").to.contain({
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      });
    });
  });
  it("GetPostById + options object req", () => {
    // options (Object) : Pass in an options object to change the default behavior of cy.request()
    cy.request({
      method: "GET",
      url: baseURL + "/posts/1",
      headers: {
        "content-type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache",
        followRedirect: false, // turn off following redirects
      },
    }).as("GetPostByIdJSON");

    cy.get("@GetPostByIdJSON").then((response) => {
      cy.log(JSON.stringify(response));
      //response: status
      expect(response.status).to.equal(200);
      expect(response.status).to.eq(200);

      //response body: key only
      expect(response.body).to.have.property("userId");
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("body");
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");

      //response body: key & value
      expect(response.body).to.have.property("userId", 1);
      expect(response.body).to.have.property("id", 1);
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("body");

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
      expect(response.body).property("userId").to.be.a("number");
      expect(response.body).property("id").to.be.a("number");
      expect(response.body).property("id").to.be.a("number");
      expect(response.body).property("id").to.be.a("number");

      //response body- key & value
      expect(response.body).property("title").to.contain("sunt aut facere");
      expect(response.body.title).contains("sunt aut facere");
      expect(response).property("body").to.contain({
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      });
    });
  });
});
