import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


// // firebaseconfig.js
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
//  import{getAuth} from 'firebase/auth';


// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBJHnr-Hc_dt-F85UjYqcEHfrPWSQfdips",
    authDomain: "ventas-e21f2.firebaseapp.com",
    projectId: "ventas-e21f2",
    storageBucket: "ventas-e21f2.appspot.com",
    messagingSenderId: "714192701317",
    appId: "1:714192701317:web:46cc73ccce5af60e0d26ec"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

export { db, app }; // Exportar db
