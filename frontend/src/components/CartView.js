import React, { useState } from 'react';

export default function CartView({ cart, onRemove }) {
  const [removing, setRemoving] = useState({}); 
  async function handleRemove(id) {
    try {
      setRemoving(prev => ({ ...prev, [id]: true }));
      await new Promise(r => setTimeout(r, 260));
      await onRemove(id);
    } catch (err) {
      setRemoving(prev => { const c={...prev}; delete c[id]; return c; });
    }
  }

  return (
    <div className=''>
      <h3>Cart</h3>
      {cart.items.length === 0 && <div className="small">No items in cart</div>}
      <ul style={{listStyle:'none', padding:0, margin:0}}>
        {cart.items.map(it => (
          <li key={it.productId} className={removing[it.productId] ? 'removing' : ''}>
            <div className="cart-row">
              <div>
                <strong>{it.name}</strong>
                <div className="small">₹{it.price} × {it.qty}</div>
              </div>
              <div style={{textAlign:'right'}}>
              <div style={{fontWeight:700}}>₹{it.lineTotal}</div> 



                <button onClick={() => handleRemove(it.productId)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <hr style={{border:'none',height:1,background:'rgba(255,255,255,0.2)', margin:'12px 0'}}/>
      <div className="total">
        <div className="small">Total</div>
        <div>₹{cart.total.toFixed(2)}</div>
      </div>

      <hr style={{border:'none',height:1,background:'rgba(255,255,255,0.4)', margin:'12px 0'}}/>
      
    </div>
  );
}
