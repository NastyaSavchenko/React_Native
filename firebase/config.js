import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyCE-61tFXYtcP3Tud2G2Lnp6nE-YA72Voc',
  authDomain: 'social-network-93fea.firebaseapp.com',
  databaseURL: 'https://social-network-93fea.firebaseio.com',
  projectId: 'social-network-93fea',
  storageBucket: 'social-network-93fea.appspot.com',
  messagingSenderId: "108033944996",
  appId: "1:108033944996:web:c3b34beef09bf2481f2531",
  measurementId: "G-NLYFL1BQSP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);