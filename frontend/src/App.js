import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCart, addToCart, removeFromCart, checkout } from './api';
import ProductsList from './components/ProductList';
import CartView from './components/CartView';
import CheckoutForm from './components/CheckoutForm';
import ReceiptModal from './components/ReceiptModal';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');

  async function load() {
    try {
      setLoading(true);
      const p = await fetchProducts();
      setProducts(p);
      const c = await fetchCart();
      setCart(c);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(product) {
    try {
      setLoading(true);
      await addToCart(product._id || product.id || product.productId, 1);
      const c = await fetchCart();
      setCart(c);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  async function handleRemove(itemId) {
    try {
      setLoading(true);
      await removeFromCart(itemId);
      const c = await fetchCart();
      setCart(c);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  async function handleCheckout(name, email) {
    try {
      const payload = { cartItems: cart.items.map(i => ({ productId: i.productId, qty: i.qty, price: i.price })), name, email };
      const res = await checkout(payload);
      setReceipt(res.receipt);
      setCart({ items: [], total: 0 });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Vibe Commerce — Mock Cart</h1>
      </header>
      {error && <div className="error">{error}</div>}
      <main>
        <ProductsList products={products} onAdd={handleAdd} loading={loading}/>
        <aside className='cart-card'>
          <CartView cart={cart} onRemove={handleRemove}/>
          <CheckoutForm onSubmit={handleCheckout} disabled={cart.items.length === 0}/>
        </aside>
      </main>
      {receipt && <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />}
      <footer>Built for Vibe Commerce screening</footer>
    </div>
  );
}

export default App;
