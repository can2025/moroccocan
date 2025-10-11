import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbobrnsfxRyl81BUmoBIklGzqEF9LcdRQ",
  authDomain: "banneradscan2025.firebaseapp.com",
  databaseURL: "https://banneradscan2025-default-rtdb.firebaseio.com",
  projectId: "banneradscan2025",
  storageBucket: "banneradscan2025.appspot.com",
  messagingSenderId: "269622138763",
  appId: "1:269622138763:android:af322e75458e1101f5418e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;