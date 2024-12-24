import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyC7Rhr4UnfPmxAuC1EXeZSHVJaj5VL-1O0",
  authDomain: "rent-a-scooter-4f782.firebaseapp.com",
  projectId: "rent-a-scooter-4f782",
  storageBucket: "rent-a-scooter-4f782.firebasestorage.app",
  messagingSenderId: "795773097839",
  appId: "1:795773097839:web:7d49b7e72651c5346e7a9a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user; // Authenticated user
    return user;
  } catch (error) {
    const errorMessage = error.message;
    const errorCode = error.code;

    // Handle specific Firebase authentication errors
    if (errorCode === "auth/popup-closed-by-user") {
      throw {
        message: "Popup closed before completing sign-in.",
        status: errorCode,
      };
    } else {
      throw { message: errorMessage, status: errorCode }; // Catch other errors
    }
  }
}

// Refactor fetch calls
const scooterDatabaseRef = collection(database, "Scooters");

export async function getScooters() {
  const snapshot = await getDocs(scooterDatabaseRef);
  const scooters = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return scooters;
}

export async function getScooter(id) {
  const docRef = doc(database, "Scooters", id);
  const snapshot = await getDoc(docRef);

  return { ...snapshot.data(), id: snapshot.id };
}

export async function getHostScooter(user) {
  if (!user) {
    throw new Error("No user is logged in");
  }

  const hostId = user.uid;
  const q = query(scooterDatabaseRef, where("hostId", "==", hostId));
  const snapshot = await getDocs(q);
  const scooters = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return scooters;
}

export async function loginUser(creds) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );
    return userCredential.user; // Return the authenticated user data
  } catch (error) {
    const errorMessage = error.message;
    const errorCode = error.code;

    // Handle specific Firebase authentication errors
    if (errorCode === "auth/user-not-found") {
      throw {
        message: "User not found. Please check the email address.",
        status: errorCode,
      };
    } else if (errorCode === "auth/wrong-password") {
      throw {
        message: "Incorrect password. Please try again.",
        status: errorCode,
      };
    } else {
      throw { message: errorMessage, status: errorCode }; // Catch other errors
    }
  }
}

export async function createUser(creds) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );
    return userCredential.user; // Return the created user data
  } catch (error) {
    const errorMessage = error.message;
    const errorCode = error.code;

    if (errorCode === "auth/email-already-in-use") {
      throw {
        message: "Email is already in use. Please choose another one.",
        status: errorCode,
      };
    } else {
      throw { message: errorMessage, status: errorCode };
    }
  }
}

export default loginUser;
