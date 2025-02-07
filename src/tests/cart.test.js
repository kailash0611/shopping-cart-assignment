const Cart = require("../../models/cart"); // Ensure correct path

describe("Shopping Cart", () => {
  it("should correctly add products to the cart", () => {
    Cart.addProduct("cornflakes", 2.52, 2); // (product, price, quantity)
    Cart.addProduct("weetabix", 9.98, 1); 

    const state = Cart.getCartState(); // Corrected method name
    expect(state.subtotal).toBeCloseTo(15.02); // Use `toBeCloseTo` for floating-point precision
    expect(state.tax).toBeCloseTo(1.88);
    expect(state.total).toBeCloseTo(16.90);
  });
});
