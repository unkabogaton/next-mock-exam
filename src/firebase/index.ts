import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4Xyvo25jZMADmO1Z_2q5mT5o9vkeOZNg",
  authDomain: "mock-exam-8d75d.firebaseapp.com",
  databaseURL:
    "https://mock-exam-8d75d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mock-exam-8d75d",
  storageBucket: "mock-exam-8d75d.appspot.com",
  messagingSenderId: "715486269249",
  appId: "1:715486269249:web:85856a225e66b0f72e5bc0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
