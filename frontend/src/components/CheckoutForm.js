import React, { useState } from 'react';

export default function CheckoutForm({ onSubmit, disabled }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function submit(e) {
    e.preventDefault();
    onSubmit(name, email);
  }

  return (
    <form className="checkout" onSubmit={submit}>
      <h3>Checkout</h3>
      <label>
        Name
        <input value={name} onChange={e => setName(e.target.value)} required/>
      </label>
      <label>
        Email
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" required/>
      </label>
      <button className='cart-button' type="submit" disabled={disabled}>Place Order</button>
    </form>
  );
}
