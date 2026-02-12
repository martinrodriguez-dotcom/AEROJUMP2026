import React, { useState } from 'react';
import { calculateSuggestedPrice } from '../../services/stockService';

const ProductForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    name: '', costBulto: 0, units: 1, realPrice: 0
  });

  const suggested = calculateSuggestedPrice(formData.costBulto, formData.units);

  return (
    <div className="product-form">
      <input type="text" placeholder="Nombre Producto" onChange={e => setFormData({...formData, name: e.target.value})} />
      <input type="number" placeholder="Costo Bulto" onChange={e => setFormData({...formData, costBulto: e.target.value})} />
      <input type="number" placeholder="Unidades" onChange={e => setFormData({...formData, units: e.target.value})} />
      
      <div className="price-info">
        <p>Precio Sugerido (40%): <strong>${suggested.toFixed(2)}</strong></p>
        <input type="number" placeholder="Precio Real" onChange={e => setFormData({...formData, realPrice: e.target.value})} />
      </div>
      
      <button onClick={() => onSave(formData)}>Guardar Producto</button>
    </div>
  );
};
