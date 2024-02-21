import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "note-app-26c43.firebaseapp.com",
    projectId: "note-app-26c43",
    storageBucket: "note-app-26c43.appspot.com",
    messagingSenderId: "751965325877",
    appId: "1:751965325877:web:902ec7eb7c57ace27fbf7c"
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseDb = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);