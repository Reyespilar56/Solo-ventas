// Importar Firebase y Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"; 
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js"; 

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

// Inicializar Firestore
const db = getFirestore(app);

// Obtener el botón de confirmar y el formulario
const bton = document.getElementById('bton');
const formulario = document.getElementById("miFormulario");

// Manejar el clic en el botón de confirmar
bton.addEventListener("click", async (e) => {
    e.preventDefault(); // Evitar que el botón dispare el envío del formulario

    // Obtener los campos del formulario
    var Nombre = document.getElementById('Nombre').value;
    var correoElectronico = document.getElementById('correoElectronico').value;
    var Telefono = document.getElementById('Telefono').value;
    var TelefonoMovil = document.getElementById('TelefonoMovil').value;
    var Direccion = document.getElementById('Direccion').value;
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById('contrasena').value;
    var confirmarContrasena = document.getElementById('confirmarContrasena').value;

    // Encriptar la contraseña con CryptoJS (SHA-256)
    var hashedPassword = CryptoJS.SHA256(contrasena).toString();

    try {
        // Agregar el documento a la colección "usuarios"
        const docRef = await addDoc(collection(db, "usuarios"), {
          Direccion: Direccion,
          Usuario: usuario,
          Nombre: Nombre,
          email: correoElectronico,
          movil: TelefonoMovil,
          telefono: Telefono,
          contraseña: hashedPassword, // Guardar la contraseña hasheada
          Contraseñaconfirmada: confirmarContrasena
        });

        console.log("Documento agregado con ID: ", docRef.id);
        
        // Alerta de éxito
        alert("Usuario agregado con éxito!");
    } catch (e) {
        console.error("Error al agregar el documento: ", e);
        
        // Alerta de error
        alert("Error al agregar usuario!");
    }
});
