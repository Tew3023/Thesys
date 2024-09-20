require('dotenv').config();
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const orderSchema = require('../models/order')
const express = require('express');

const endpointSecret = process.env.ENDPOINT_WEBHOOK;

router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('  Webhook Error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Process event
  switch (event.type) {
    case 'checkout.session.completed':
      const paymentSuccessData = event.data.object
      const sessionId = paymentSuccessData.id;
      const status = paymentSuccessData.status
      const result = await orderSchema.updateOne({session_id : sessionId}, {$set : {status : status}})
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.send();
});


  module.exports = router