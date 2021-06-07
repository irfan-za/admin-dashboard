import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  databaseURL:
    "https://pos-app-7875c-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Realtime Darabase
const db = firebase.database();
const stokBarangRef = db.ref("stokBarang");

// auth
const authh = firebase.auth();
export { stokBarangRef, authh, db };
