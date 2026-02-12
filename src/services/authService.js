import { auth } from '../firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";

export const loginUser = async (email, password) => {
  try {
    // Establece persistencia local (la sesión no se cierra al refrescar)
    await setPersistence(auth, browserLocalPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error.message;
  }
};

export const logoutUser = () => signOut(auth);
