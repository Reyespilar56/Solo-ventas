
// // Importar Firebase y Firestore
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// // Configuración de Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyBJHnr-Hc_dt-F85UjYqcEHfrPWSQfdips",
//     authDomain: "ventas-e21f2.firebaseapp.com",
//     projectId: "ventas-e21f2",
//     storageBucket: "ventas-e21f2.appspot.com",
//     messagingSenderId: "714192701317",
//     appId: "1:714192701317:web:46cc73ccce5af60e0d26ec"
// };
// // Inicializar Firebase y Firestore
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Obtener referencias a elementos del DOM
// const searchButton = document.getElementById('searchButton');
// const emailInput = document.getElementById('emailInput');
// const resultsList = document.getElementById('resultsList');

// // Función para realizar la búsqueda
// function searchUserByEmail() {
//   const email = emailInput.value;
//   const usersCollection = collection(db, 'users'); // Ajusta el nombre de la colección según tu base de datos
//   const q = query(usersCollection, where("correoElectronico", "==", email));

//   getDocs(q)
//     .then((snapshot) => {
//       if (snapshot.empty) {
//         resultsList.innerHTML = '<p>No se encontraron usuarios con ese correo electrónico.</p>';
//       } else {
//         let html = '';
//         snapshot.docs.forEach((doc) => {
//           const data = doc.data();
//           html += `<li>Nombre: ${data.Nombre}, ID: ${doc.id}</li>`;
//         });
//         resultsList.innerHTML = html;
//       }
//     })
//     .catch((error) => {
//       console.error("Error al buscar usuario:", error);
//       resultsList.innerHTML = '<p>Ocurrió un error al realizar la búsqueda.</p>';
//     });
// }

// // Agregar un event listener al botón de búsqueda
// searchButton.addEventListener('click', searchUserByEmail);