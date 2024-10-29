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

// Función para mostrar el mensaje de error en el centro de la página
function mostrarMensajeError(mensaje) {
  let mensajeError = document.getElementById('mensajeError');

  if (!mensajeError) {
    mensajeError = document.createElement('div');
    mensajeError.id = 'mensajeError';

    // Estilos para centrar el mensaje de error
    mensajeError.style.position = 'fixed';
    mensajeError.style.top = '65%';
    mensajeError.style.left = '50%';
    mensajeError.style.transform = 'translate(-50%, -50%)';
    mensajeError.style.color = 'red';
    mensajeError.style.padding = '15px';
    mensajeError.style.border = '1px solid red';
    mensajeError.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    mensajeError.style.borderRadius = '5px';

    mensajeError.style.maxWidth = '90vw';
    mensajeError.style.width = '300px';
    mensajeError.style.textAlign = 'center';
    mensajeError.style.wordWrap = 'break-word';

    document.body.appendChild(mensajeError);
  }

  mensajeError.textContent = mensaje;
}

// Función para validar usuario y contraseña
async function validarCredenciales(usuarioIngresado, contrasenaIngresada) {
  const q = query(collection(db, "administradores"), where("Usuario", "==", usuarioIngresado));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      mostrarMensajeError("El usuario no existe.");
      return false;
    }

    let esValido = false;
    querySnapshot.forEach((doc) => {
      const datosUsuario = doc.data();
      const hashedPasswordIngresada = CryptoJS.SHA256(contrasenaIngresada).toString();

      if (datosUsuario.contraseña === hashedPasswordIngresada) {
        esValido = true;
        mostrarMensajeError(""); // Limpiar mensaje si es correcto
      } else {
        mostrarMensajeError("Contraseña incorrecta.");
      }
    });

    return esValido;

  } catch (error) {
    console.error("Error al validar las credenciales: ", error);
    mostrarMensajeError("Ocurrió un error al validar las credenciales.");
    return false;
  }
}

// login.js
document.getElementById("json_post").addEventListener("click", async (e) => {
  e.preventDefault();

  const usuarioIngresado = document.getElementById('usuario').value;
  const contrasenaIngresada = document.getElementById('contrasena').value;

  // Validación de credenciales
  const esValido = await validarCredenciales(usuarioIngresado, contrasenaIngresada);

  if (esValido) {
      localStorage.setItem("auth", usuarioIngresado); // Marca al usuario como autenticado
      window.location.href = '/administracion/administracions.html'; // Redirige a la página de administración
  } else {
      mostrarMensajeError("Credenciales no válidas"); // Muestra el mensaje de error
  }
});
