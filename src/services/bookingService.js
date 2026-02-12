import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const MAX_CAPACITY = 30;

export const checkAvailability = async (date, hour) => {
  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, 
    where("date", "==", date),
    where("hour", "==", hour)
  );

  const querySnapshot = await getDocs(q);
  let currentOccupancy = 0;

  querySnapshot.forEach((doc) => {
    currentOccupancy += doc.data().peopleCount;
  });

  return {
    availableSlots: MAX_CAPACITY - currentOccupancy,
    isFull: currentOccupancy >= MAX_CAPACITY
  };
};
