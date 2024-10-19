import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVqbym9vn5SJ_kME4xNXrGNpJ7Z3ivQgA",
  authDomain: "ebusiness-shop-d7b7f.firebaseapp.com",
  projectId: "ebusiness-shop-d7b7f",
  storageBucket: "ebusiness-shop-d7b7f.appspot.com",
  messagingSenderId: "1051723357063",
  appId: "1:1051723357063:web:9ddf04acff840052fb9122"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;