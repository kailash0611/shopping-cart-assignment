const CartItem = require("./cartItem");

class Cart {
  constructor() {
    this.items = [];
  }

  addProduct(name, quantity, price) {
    const existingItem = this.items.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new CartItem(name, quantity, price));
    }
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTax() {
    return Math.round(this.getSubtotal() * 0.125 * 100) / 100; // 12.5% tax
  }

  getTotal() {
    return this.getSubtotal() + this.getTax();
  }

  getCartState() {
    return {
      items: this.items,
      subtotal: this.getSubtotal(),
      tax: this.getTax(),
      total: this.getTotal(),
    };
  }
}

module.exports = Cart;
