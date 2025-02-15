import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCLWBqzRdARwDaGgwpT5UxDOt_qZSRwfco",
  authDomain: "shoponline-6a06a.firebaseapp.com",
  projectId: "shoponline-6a06a",
  storageBucket: "shoponline-6a06a.firebasestorage.app",
  messagingSenderId: "16527526908",
  appId: "1:16527526908:web:31853d210795b0ae300079",
  measurementId: "G-J4V351LH90"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);