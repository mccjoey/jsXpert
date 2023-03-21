const { describe, it, after, before } = require("mocha");
const supertest = require("supertest");
const assert = require("assert");

describe("API Suite test", () => {
  let app;

  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });

  after((done) => {
    app.close(done);
  });

  describe("/contact:get", () => {
    it("should request contact route and return HTTP Status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);

      assert.strictEqual(response.text, "contact us page");
    });
  });

  describe("/login:post", () => {
    it("should request login route and return HTTP Status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({
          username: "Jose",
          password: "123",
        })
        .expect(200);
      assert.strictEqual(response.text, "Log in suceeded");
    });

    it("should request login route and return HTTP Status 401 when failed", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({
          username: "jose",
          password: "123",
        })
        .expect(401);
      assert.strictEqual(response.text, "Log in Failed");
    });
  });

  describe("/anything:get", () => {
    it("should request a route that doesn't exist and return HTTP Status 404", async () => {
      const response = await supertest(app).get("/anything").expect(404);
      assert.strictEqual(response.text, "Not found!");
    });
  });
});
