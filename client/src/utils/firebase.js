// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAZfTxtf1-ylydu4rVd_kZeBV-J5GAW3rE",
  authDomain: "perera-bakers.firebaseapp.com",
  projectId: "perera-bakers",
  storageBucket: "perera-bakers.appspot.com",
  messagingSenderId: "216612501385",
  appId: "1:216612501385:web:41d885f2bc728fdfda5358",
  measurementId: "G-WNLMQQ717R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app); 