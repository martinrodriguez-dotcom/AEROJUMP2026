import { db } from '../firebaseConfig';
import { doc, updateDoc, increment, addDoc, collection } from 'firebase/firestore';

// Calcular precio sugerido (Margen 40%)
export const calculateSuggestedPrice = (costoBulto, unidadesPorBulto) => {
  const costoUnitario = costoBulto / unidadesPorBulto;
  return costoUnitario * 1.40;
};

// Reposición Rápida
export const addStock = async (productId, quantityToAdd) => {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, {
    stock: increment(quantityToAdd)
  });
};

// Venta Atómica (Descuenta stock y registra finanzas)
export const processSale = async (cartItems, totalAmount) => {
  // En un entorno real, usar writeBatch de Firebase para seguridad atómica
  const batch = db.batch();
  
  cartItems.forEach(item => {
    const ref = doc(db, "products", item.id);
    batch.update(ref, { stock: increment(-item.quantity) });
  });

  const saleRef = collection(db, "sales");
  await addDoc(saleRef, {
    items: cartItems,
    total: totalAmount,
    date: new Date()
  });
};
