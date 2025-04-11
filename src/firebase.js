import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyA8WWKIEGm4IZR1GRquvgK_qyWvy4aD-OQ",
  authDomain: "lostlink-3c1cf.firebaseapp.com",
  databaseURL: "https://lostlink-3c1cf-default-rtdb.firebaseio.com",
  projectId: "lostlink-3c1cf",
  storageBucket: "lostlink-3c1cf.firebasestorage.app",
  messagingSenderId: "685602984530",
  appId: "1:685602984530:web:5c395ac9d31bc54e1c858b",
  measurementId: "G-D8T5D34VL3",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };


