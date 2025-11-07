const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetchFn = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const Product = require('./models/Product');
require('./models/CartItem');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

async function syncFakeStoreProducts() {
  try {
    console.log('Fetching products from Fake Store API...');
    const res = await fetchFn('https://fakestoreapi.com/products?limit=10');

    const data = await res.json();

    if (mongoose.connection.readyState) {
      await Product.deleteMany({});
await Product.insertMany(
  data.map(p => ({
    fakeId: p.id,               
    name: p.title,
    price: p.price,
    description: p.description,
    image: p.image
  }))
);
console.log('✅ Synced products into MongoDB');

    } else {
      global.fakeProducts = data.map(p => ({
        id: p.id.toString(),
        name: p.title,
        price: p.price,
        description: p.description,
        image: p.image
      }));
      console.log('✅ Cached products in memory');
    }
  } catch (err) {
    console.error('❌ Failed to fetch Fake Store API:', err);
  }
}

async function start() {
  try {
    if (MONGODB_URI) {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
    } else {
      console.log('⚠️ No MongoDB URI — using in-memory storage');
    }

    await syncFakeStoreProducts();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}

start();
