import { initializeApp } from "firebase/app";
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

const database = getFirestore(app);

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

export async function getHostScooter() {
  const q = query(scooterDatabaseRef, where("hostId", "==", "123"));
  const snapshot = await getDocs(q);
  const scooters = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return scooters;
}

async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}

export default loginUser;
