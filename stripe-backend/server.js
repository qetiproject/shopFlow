require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: process.env.LOCAL_CLIENT_URL, credentials: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/checkout', async (req, res, next) => {
  try {
    const { items } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.products.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.thumbnail],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.LOCAL_CLIENT_URL}/checkout/success`,
      cancel_url: `${process.env.LOCAL_CLIENT_URL}/checkout/canceled`,
    });

    res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
