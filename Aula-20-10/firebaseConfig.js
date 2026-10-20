// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNEF1E2kfzVUS8kTV9VCCmDyK78KgTi4c",
  authDomain: "aula-20-10-783da.firebaseapp.com",
  databaseURL: "https://aula-20-10-783da-default-rtdb.firebaseio.com",
  projectId: "aula-20-10-783da",
  storageBucket: "aula-20-10-783da.firebasestorage.app",
  messagingSenderId: "86867443575",
  appId: "1:86867443575:web:706cd11e8afbb65d89eb72",
  measurementId: "G-NKV45PFJ5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
