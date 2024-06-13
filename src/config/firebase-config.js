import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgrBZ6pygM5RPt6Ya9eIrTVrmGQt0Jn1U",
  authDomain: "first-app-2dcd5.firebaseapp.com",
  projectId: "first-app-2dcd5",
  storageBucket: "first-app-2dcd5.appspot.com",
  messagingSenderId: "727404439333",
  appId: "1:727404439333:web:f9e35a48c7dbadb9aadccc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };

// firebase login
// firebase init
// firebase deploy
