require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4242;
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors());
app.use(express.json());

// Initialize a transaction
app.post('/create-transaction', async (req, res) => {
  try {
    const { email, items } = req.body;

    if (!email || !items || !Array.isArray(items)) {
      return res.status(400).send({ error: 'Missing email or items' });
    }

    // Compute amount in kobo (assuming your prices are in cents-like units; convert appropriately)
    // If your product.price is in cents (e.g., 15000 means 150.00), Paystack expects amount in kobo (so multiply by 100)
    const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0); // if price already in kobo-equivalent leave it
    // If your price is e.g., 15000 representing ₦15,000 and Paystack wants kobo multiply by 100: amount *= 100

    const body = {
      email,
      amount, // in kobo (smallest currency unit) - adjust if needed
      callback_url: `${FRONTEND_URL}/payment-success`,
      metadata: {
        items,
      },
    };

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!data.status) {
      return res.status(500).send({ error: 'Failed to initialize transaction', detail: data });
    }

    // return authorization_url to frontend
    res.status(200).json({
  authorization_url: data.data.authorization_url,
  reference: data.data.reference,
});
  } catch (err) {
    console.error('Create transaction error', err);
    res.status(500).send({ error: 'Server error' });
  }
});

// Verify transaction
app.get('/verify/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
      },
    });
    const data = await response.json();
    if (!data.status) {
      return res.status(400).send({ verified: false, detail: data });
    }
    // You can further inspect data.data.status === 'success'
    res.send({ verified: true, data: data.data });
  } catch (err) {
    console.error('Verify error', err);
    res.status(500).send({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Paystack backend running on port ${PORT}`);
});
