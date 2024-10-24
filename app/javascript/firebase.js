// app/javascript/firebase.js
import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "env";
import { getFirestore } from "firebase/firestore"

let app;

export function getFirebaseApp() {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}

export function getFirebaseStore() {
  return getFirestore(getFirebaseApp()); 
}