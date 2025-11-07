import React from "react";

export default function ReceiptModal({ receipt, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Receipt</h2>
        <p>
          <strong>Order ID:</strong> {receipt.id}
        </p>
        <p>
          <strong>Name:</strong> {receipt.name}
        </p>
        <p>
          <strong>Total:</strong> ₹{receipt.total}
        </p>
        <p>
          <strong>Time:</strong> {new Date(receipt.timestamp).toLocaleString()}
        </p>
        <h4>Items</h4>
        <ul>
          {receipt.items.map((i, idx) => (
            <li key={idx}>
              {i.name} × {i.qty} — ₹{(i.price * i.qty).toFixed(2)}
            </li>
          ))}
        </ul>

        <button className="reciBtn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
