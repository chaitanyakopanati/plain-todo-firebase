import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "",
    authDomain: "disabled-fire-crud",
    databaseURL: "",
    projectId: "disabled-fire-crud",
    storageBucket: "disabled-fire-cryom",
    messagingSenderId: "",
    appId: "1:5438934d82783656"
  };
  const app =initializeApp(firebaseConfig);
const db = getFirestore(app);
  export default db;
  