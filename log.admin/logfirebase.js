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
    mensajeError.style.position = 'fixed'; // Cambiado a 'fixed' para mejor responsividad
    mensajeError.style.top = '65%';
    mensajeError.style.left = '50%';
    mensajeError.style.transform = 'translate(-50%, -50%)';
    mensajeError.style.color = 'red';
    mensajeError.style.padding = '15px'; // Padding para mejor presentación
    mensajeError.style.border = '1px solid red'; // Bordes para mejor visibilidad
    mensajeError.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // Fondo semi-transparente
    mensajeError.style.borderRadius = '5px'; // Bordes redondeados
    //mensajeError.style.zIndex = '1000'; // Asegura que esté por encima de otros elementos
    // Estilos responsivos
    mensajeError.style.maxWidth = '90vw'; // Limitar el ancho en pantallas pequeñas
    mensajeError.style.width = '300px'; // Ancho fijo para pantallas más grandes
    mensajeError.style.textAlign = 'center'; // Centrar el texto
    mensajeError.style.wordWrap = 'break-word'; // Permitir que las palabras largas se dividan
    document.body.appendChild(mensajeError); // Añadir el mensaje al final del cuerpo de la página
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

      if (datosUsuario.contraseña === contrasenaIngresada) {
        esValido = true;
        mostrarMensajeError(""); // Limpiar mensaje si es correcto
      } else {
        mostrarMensajeError("Contraseña incorrecta."); // Mensaje de contraseña incorrecta
      }
    });

    return esValido;

  } catch (error) {
    console.error("Error al validar las credenciales: ", error);
    mostrarMensajeError("Ocurrió un error al validar las credenciales.");
    return false;
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
    window.location.href = '/administracion/administracions.html'; // Redirige si las credenciales son válidas
  }
});