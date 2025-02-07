const request = require("supertest");
const app = require("../src/app");

describe("Cart API", () => {
  it("should add a product and return updated cart", async () => {
    const res = await request(app)
      .post("/cart/add")
      .send({ name: "cornflakes", quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.subtotal).toBeGreaterThan(0);
  });
  
  it("should fetch the current cart state", async () => {
    const res = await request(app).get("/cart");
    expect(res.statusCode).toBe(200);
  });
});
