// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxfF8gQQvRHTT4YjuQ41C19jHgGNXo3yg",
  authDomain: "achcharu-927fd.firebaseapp.com",
  projectId: "achcharu-927fd",
  storageBucket: "achcharu-927fd.firebasestorage.app",
  messagingSenderId: "916011228256",
  appId: "1:916011228256:web:7498c030c11e927c4af705"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);