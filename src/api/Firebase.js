import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCAXEKxXbjlNWjALaGgZuQSX5C-IUBlZII',
  authDomain: 'dilemma-40a4f.firebaseapp.com',
  projectId: 'dilemma-40a4f',
  storageBucket: 'dilemma-40a4f.appspot.com',
  messagingSenderId: '1058343018136',
  appId: '1:1058343018136:web:046f4ba485bcf77ec7faed',
  measurementId: 'G-XTQ83PHSYL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };
