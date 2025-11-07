import React from 'react';

export default function ProductsList({ products, onAdd, loading }) {
  return (
    <section className="products">
      <h2>Products</h2>
      <div className="grid">
        {products.length === 0 && <div>Loading products...</div>}
        {products.map(p => (
          <div key={p._id || p.id} className="card">
            {p.image && <img src={p.image} alt={p.name} className="product-img" />}
            <div className="card-body">
              <h3>{p.name}</h3>
              <p className="desc">{p.description?.slice(0, 60)}...</p>
              <div className="price">₹{p.price}</div>
              <button className='card-button' onClick={() => onAdd(p)} disabled={loading}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
