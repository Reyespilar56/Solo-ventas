import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

// Función para validar usuario y contraseña
async function validarCredenciales(usuarioIngresado, contrasenaIngresada) {
  const q = query(collection(db, "usuarios"), where("Usuario", "==", usuarioIngresado));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("El usuario no existe.");
      return false;  // Usuario no encontrado
    }

    let esValido = false;
    querySnapshot.forEach((doc) => {
      const datosUsuario = doc.data();
      const hashedPasswordIngresada = CryptoJS.SHA256(contrasenaIngresada).toString();

      if (datosUsuario.contraseña === hashedPasswordIngresada) {
        esValido = true;
        console.log("Inicio de sesión exitoso.");
      } else {
        console.log("Contraseña incorrecta.");
      }
    });

    return esValido;

  } catch (error) {
    console.error("Error al validar las credenciales: ", error);
    return false;  // Error en la validación
  }
}

// Ejemplo de uso
const button = document.getElementById('json_post');
button.addEventListener("click", async (e) => {
  e.preventDefault(); // Evitar recarga de página

  const usuarioIngresado = document.getElementById('usuario').value;
  const contrasenaIngresada = document.getElementById('contrasena').value;

  const esValido = await validarCredenciales(usuarioIngresado, contrasenaIngresada);

  if (esValido) {
  
    localStorage.setItem("auth", usuarioIngresado);
    window.location.href = '/index/index.html'; // Redirige si las credenciales son válidas
  } 
});
