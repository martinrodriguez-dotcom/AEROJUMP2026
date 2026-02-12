import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración (ya verificada)
const firebaseConfig = {
  apiKey: "AIzaSyBfgOS2tQcRHa4XYp85wVeyvLJDeSph2uM",
  authDomain: "aerojump2026.firebaseapp.com",
  projectId: "aerojump2026",
  storageBucket: "aerojump2026.firebasestorage.app",
  messagingSenderId: "1086028254801",
  appId: "1:1086028254801:web:006d7b4f0b66bb59f3b270"
};

// 1. Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 2. Inicializar los servicios y EXPORTARLOS
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
