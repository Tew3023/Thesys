require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const productRoute = require('./routes/products');
const stripeRoute = require('./routes/stripe')
const webRoute = require('./routes/webhook')


app.use('/api',webRoute)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const uri = process.env.MONGODB_URI
const clientOptions = { 
  serverApi: { version: '1', strict: true, deprecationErrors: true } 
};

mongoose.connect(uri, clientOptions)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.use('/api/product', productRoute);
app.use('/api',stripeRoute)

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
