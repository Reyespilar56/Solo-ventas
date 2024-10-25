import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

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



// firebaseconfig.js
import { firestore } from './firebase';

export const getFilteredData = async (filterCriteria) => {
  try {
    const snapshot = await firestore.collection('ventas').get();
    const filteredData = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      
      // Aquí puedes filtrar los datos según 'filterCriteria' 
      // o bien enviar todos y hacer el filtrado en el front
    //   if (/* condición de filtrado según filterCriteria */

    //   )
       {
        filteredData.push({ id: doc.id, ...data });
      }
    });

    return filteredData;
  } catch (error) {
    console.error("Error al obtener los datos de Firestore:", error);
    return [];
  }
};
