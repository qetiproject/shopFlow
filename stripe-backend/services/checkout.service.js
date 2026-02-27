const Stripe = require('stripe');

class CheckoutService {
  #stripe;

  constructor(secretKey) {
    if (!secretKey) throw new Error('Stripe secret key is required');
    this.#stripe = Stripe(secretKey);
  }

  async createSession(items, successUrl, cancelUrl) {
    if (!items?.length) throw new Error('No products provided');

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.title, images: [item.thumbnail] },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await this.#stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return session;
  }
}

module.exports = CheckoutService;
