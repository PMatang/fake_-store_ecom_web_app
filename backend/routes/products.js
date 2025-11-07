const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    if (global.fakeProducts?.length) {
      return res.json(global.fakeProducts);
    }

    const products = await Product.find().limit(10);
    if (!products.length) return res.status(404).json({ error: 'No products found' });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

module.exports = router;
