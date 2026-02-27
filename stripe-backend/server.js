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

app.post('/api/checkout', async (req, res) => {
  try {
    const { items } = req.body;

    const session = await checkoutService.createSession(
      items.products,
      `${process.env.CLIENT_URL}/checkout/success`,
      `${process.env.CLIENT_URL}/checkout/canceled`,
    );

    res.json({ url: session.url });
  } catch (error) {
    handleError(res, error, 'Failed to create Stripe checkout session');
  }
});

app.post('/api/ai-chat', async (req, res) => {
  const fallbackMessage =
    'Unfortunately, I am unable to answer at this stage. Please leave your number and a manager will contact you.';

  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });

    const reply = await askAI(message);

    res.json({ reply });
  } catch (error) {
    handleError(res, error, fallbackMessage);
  }
});

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
