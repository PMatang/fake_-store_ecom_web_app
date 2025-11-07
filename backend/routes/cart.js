const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

let inMemoryCart = [];

async function computeCartResponse(cartItems) {
  const result = [];
  let total = 0;

  for (const item of cartItems) {
    let product = null;

    if (mongoose.connection.readyState) {
      let numericId = Number(item.productId);
      if (isNaN(numericId)) numericId = null;

      product = await Product.findOne({
        $or: [
          { _id: item.productId },
          ...(numericId ? [{ fakeId: numericId }] : [])
        ]
      });
    } else {
      product =
        global.fakeProducts?.find(
          (p) => p.id.toString() === item.productId.toString()
        ) || null;
    }

    if (!product) {
      console.warn(`⚠️ Product not found for ID: ${item.productId}`);
      product = { name: 'Unknown Product', price: 0 };
    }

    const price = product.price || 0;
    const lineTotal = price * item.qty;
    total += lineTotal;

    result.push({
      id: item._id || item.productId,
      productId: item.productId,
      name: product.name,
      price,
      qty: item.qty,
      lineTotal
    });
  }

  return { items: result, total };
}

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState) {
      const CartItem = mongoose.model('CartItem');
      const items = await CartItem.find();
      const response = await computeCartResponse(items);
      return res.json(response);
    } else {
      const response = await computeCartResponse(inMemoryCart);
      return res.json(response);
    }
  } catch (err) {
    console.error('❌ Error in GET /api/cart:', err);
    res.status(500).json({ error: 'Failed to load cart' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId required' });

    let normalizedId = productId.toString();

    if (mongoose.connection.readyState) {
      const CartItem = mongoose.model('CartItem');
      const existing = await CartItem.findOne({ productId: normalizedId });
      if (existing) {
        existing.qty += qty;
        await existing.save();
      } else {
        await CartItem.create({ productId: normalizedId, qty });
      }
      return res.status(201).json({ message: 'Item added to cart' });
    } else {
      const existing = inMemoryCart.find(i => i.productId === normalizedId);
      if (existing) existing.qty += qty;
      else inMemoryCart.push({ productId: normalizedId, qty });
      return res.status(201).json({ message: 'Item added (in-memory)' });
    }
  } catch (err) {
    console.error('❌ Error in POST /api/cart:', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id.toString();

    if (mongoose.connection.readyState) {
      const CartItem = mongoose.model('CartItem');
      const deleted =
        (await CartItem.findOneAndDelete({ productId: id })) ||
        (await CartItem.findByIdAndDelete(id));

      if (!deleted) return res.status(404).json({ error: 'Item not found' });
      return res.json({ success: true });
    } else {
      const idx = inMemoryCart.findIndex(i => i.productId === id);
      if (idx === -1) return res.status(404).json({ error: 'Item not found' });
      inMemoryCart.splice(idx, 1);
      return res.json({ success: true });
    }
  } catch (err) {
    console.error('❌ Error in DELETE /api/cart/:id:', err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

router.post('/checkout', async (req, res) => {
  try {
    const { cartItems = [], name, email } = req.body;
    if (!cartItems.length) return res.status(400).json({ error: 'cartItems required' });

    let total = 0;
    for (const ci of cartItems) {
      let product = null;
      if (mongoose.connection.readyState) {
        let numericId = Number(ci.productId);
        if (isNaN(numericId)) numericId = null;
        product = await Product.findOne({
          $or: [
            { _id: ci.productId },
            ...(numericId ? [{ fakeId: numericId }] : [])
          ]
        });
      } else {
        product =
          global.fakeProducts?.find(p => p.id.toString() === ci.productId.toString()) || null;
      }

      const price = product?.price || 0;
      total += price * ci.qty;
    }

const detailedItems = [];

for (const ci of cartItems) {
  let product = null;
  if (mongoose.connection.readyState) {
    let numericId = Number(ci.productId);
    if (isNaN(numericId)) numericId = null;
    product = await Product.findOne({
      $or: [
        { _id: ci.productId },
        ...(numericId ? [{ fakeId: numericId }] : [])
      ]
    });
  } else {
    product =
      global.fakeProducts?.find(p => p.id.toString() === ci.productId.toString()) || null;
  }

  detailedItems.push({
    name: product?.name || 'Unknown Product',
    qty: ci.qty,
    price: product?.price || 0
  });
}

const receipt = {
  id: new Date().getTime().toString(36),
  total,
  timestamp: new Date().toISOString(),
  name: name || 'Guest',
  email: email || null,
  items: detailedItems
};

    if (mongoose.connection.readyState) {
      const CartItem = mongoose.model('CartItem');
      await CartItem.deleteMany({});
    } else {
      inMemoryCart = [];
    }

    return res.json({ receipt });
  } catch (err) {
    console.error('❌ Error in POST /api/cart/checkout:', err);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

module.exports = router;
