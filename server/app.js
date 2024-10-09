require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


const productRoute = require('./routes/products');
const stripeRoute = require('./routes/stripe')
const webRoute = require('./routes/webhook')
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const orderRoite = require('./routes/order')
const cookRoute  = require('./routes/cookies')


app.use('/api',webRoute)

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());
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
app.use('/api',stripeRoute);
app.use('/auth',registerRoute);
app.use('/auth',loginRoute);
app.use('/order',orderRoite);
app.use('/cookies',cookRoute);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
