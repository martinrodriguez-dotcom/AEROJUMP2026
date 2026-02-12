import { db } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

export const registerExpense = async (description, amount, category) => {
  return await addDoc(collection(db, "expenses"), {
    description,
    amount: parseFloat(amount),
    category,
    date: Timestamp.now()
  });
};

export const getDailyReport = async (dateString) => {
  // dateString formato "YYYY-MM-DD"
  const start = new Date(dateString + "T00:00:00");
  const end = new Date(dateString + "T23:59:59");

  const q = query(collection(db, "sales"), 
    where("date", ">=", start), 
    where("date", "<=", end)
  );
  
  const querySnapshot = await getDocs(q);
  let total = 0;
  querySnapshot.forEach(doc => total += doc.data().total);
  return total;
};
