const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed loading products');
  return res.json();
}
export async function fetchCart() {
  const res = await fetch(`${API_BASE}/cart`);
  if (!res.ok) throw new Error('Failed loading cart');
  return res.json();
}
export async function addToCart(productId, qty=1) {
  const res = await fetch(`${API_BASE}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, qty })
  });
  if (!res.ok) {
    const body = await res.json().catch(()=>({}));
    throw new Error(body.error || 'Add to cart failed');
  }
  return res.json();
}
export async function removeFromCart(id) {
  const res = await fetch(`${API_BASE}/cart/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Remove failed');
  return res.json();
}
export async function checkout(payload) {
  const res = await fetch(`${API_BASE}/cart/checkout`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Checkout failed');
  return res.json();
}
