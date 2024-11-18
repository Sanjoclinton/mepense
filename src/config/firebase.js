import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  setDoc,
} from "firebase/firestore";

import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const googleProvider = new GoogleAuthProvider();

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(
    /*settings*/ { tabManager: persistentMultipleTabManager() }
  ),
});

export const transactionsCollectionRef = collection(db, "transactions");

// FCM
export const messaging = getMessaging(app);
export const PUBLIC_VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export const generateToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: PUBLIC_VAPID_KEY,
    });
    if (currentToken) {
      return currentToken;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// firebase login
// firebase init
// firebase deploy
