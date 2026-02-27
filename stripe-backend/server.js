require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Stripe = require('stripe');
const { askAI } = require('./services/ai.service');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

function handleError(res, error, message = 'Internal server error') {
  res.status(500).json({ message });
}

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
      success_url: `${process.env.CLIENT_URL}/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/canceled`,
    });

    res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
});

const { getProductByName } = require('./services/ai.service');

app.post('/api/ai-chat', async (req, res) => {
  const fallbackMessage =
    'Unfortunately, I am unable to answer at this stage. Please leave your number and a manager will contact you.';

  try {
    const body = req.body;
    if (!body.message) return res.status(400).json({ message: 'Message is required' });
    const product = await getProductByName(body.message);
    if (!product) {
      return res.json({ message: fallbackMessage });
    }
    const context = { product };
    const message = await askAI(body.message, context);
    console.log(message, 'message');
    res.json({ message });
  } catch (err) {
    if (err.name === 'RateLimitError') {
      console.error('OpenAI rate limit exceeded');
      res.status(429).json({ message: 'API limit reached, please try later.' });
    } else {
      console.error(err);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
});

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
