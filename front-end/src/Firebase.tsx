// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAQGhANCMCWCU9USveDcf9lPx6m1rRo22g",
  authDomain: "alfa-lee-files.firebaseapp.com",
  projectId: "alfa-lee-files",
  storageBucket: "alfa-lee-files.appspot.com",
  messagingSenderId: "82020479188",
  appId: "1:82020479188:web:16cd22cd6624c4ffd1cb41",
  measurementId: "G-YY4D65MHMZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
