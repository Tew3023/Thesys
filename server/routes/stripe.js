require('dotenv').config();
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require('uuid');
const orderSchema = require('../models/order');

router.post('/checkout', async (req, res) => {
  const { product, information } = req.body;

  if (!product || !information) {
    return res.status(400).json({ error: 'Product and information are required' });
  }

  const orderId = uuidv4();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              name: product.name, 
            },
            unit_amount: product.price * 100, 
          },
          quantity: product.quantity, 
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:8888/success.html?id=${orderId}`,
      cancel_url: `http://localhost:8888/cancel.html?id=${orderId}`,
    });

    const orderData = {
      fullname: information.name, 
      address: information.address, 
      order_id: orderId,
      session_id: session.id,
      status: session.status,
    };

    await orderSchema.create(orderData); 

    console.log('Stripe session created:', session);

    res.json({
      product,
      information,
      order: orderData,
    });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Something went wrong with the payment process' });
  }
});


router.get('/order/:id', async (req,res)=>{
  const orderId = req.params.id;
  try{
    const result = await orderSchema.find({order_id : orderId})
    const orderResult = result[0]

    res.json({order:orderResult})
  }catch(error){
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Something went wrong with the payment process' });
  }

})

module.exports = router;
