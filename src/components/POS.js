import React, { useState } from 'react';
import { processSale } from '../services/stockService';

const POS = ({ products }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(cart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="pos-dual-panel">
      <div className="product-list">
        {products.map(p => (
          <button key={p.id} onClick={() => addToCart(p)} className="btn-pos">
            {p.name} <br/> <strong>${p.price}</strong>
          </button>
        ))}
      </div>

      <div className="ticket-summary">
        <h3>Ticket</h3>
        {cart.map(item => (
          <div key={item.id}>{item.name} x{item.quantity} - ${item.price * item.quantity}</div>
        ))}
        <button onClick={() => processSale(cart, total)} className="btn-confirm">
          COBRAR (Batch)
        </button>
      </div>
    </div>
  );
};
