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
const mensaje = document.getElementById("mensaje");

// Función para mostrar mensajes en el elemento mensaje
function mostrarMensaje(texto, tipo = 'success') {
  mensaje.textContent = texto; // Establece el texto del mensaje
  mensaje.style.padding = '10px';
  mensaje.style.borderRadius = '5px';
  mensaje.style.marginTop = '10px';

  if (tipo === 'error') {
    mensaje.style.color = 'red';
    mensaje.style.backgroundColor = '#f8d7da';
    mensaje.style.border = '1px solid red';
  } else {
    mensaje.style.color = 'green';
    mensaje.style.backgroundColor = '#d4edda';
    mensaje.style.border = '1px solid green';
  }
}

// Manejar el clic en el botón de confirmar
bton.addEventListener("click", async (e) => {
  e.preventDefault();

  // Obtener los campos del formulario
  var Nombre = document.getElementById('Nombre').value;
  var correoElectronico = document.getElementById('correoElectronico').value;
  var TelefonoMovil = document.getElementById('TelefonoMovil').value;
  var usuario = document.getElementById("usuario").value;
  var contrasena = document.getElementById('contrasena').value;
  var confirmarContrasena = document.getElementById('confirmarContrasena').value;

  // Validar el formulario
  if (!validarFormulario(Nombre, TelefonoMovil, usuario, contrasena, confirmarContrasena)) {
      return; // Detener el proceso si la validación falla
  }

  // Encriptar la contraseña
  var hashedPassword = CryptoJS.SHA256(contrasena).toString();

  try {
      // Agregar el documento a la colección "administradores"
      const docRef = await addDoc(collection(db, "administradores"), {
          Usuario: usuario,
          Nombre: Nombre,
          contraseña: contrasena,
          confirmarContrasena:hashedPassword
      });

      console.log("Documento agregado con ID: ", docRef.id);
      mostrarMensaje("Administrador agregado con éxito!");
  } catch (e) {
      console.error("Error al agregar el documento: ", e);
      mostrarMensaje("Error al agregar Administrador!", 'error');
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("validate.datos");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita el envío del formulario

      // Obtén los valores de los campos
      const usuario = document.getElementById("usuario").value;
      const contrasena = document.getElementById("contrasena").value;

      // Limpia el mensaje antes de validar
      mensaje.textContent = "";

      // Valida las credenciales
      if (usuario === "admin" && contrasena === "admin") { // Cambia las credenciales según necesites
          // Si son correctas, redirige a otra página
          localStorage.setItem("auth", usuario); // Guarda el usuario en localStorage
          window.location.href = "/master/master.html"; // Cambia esto a la URL de tu página de destino
      } else {
          // Si no son correctas, muestra un mensaje
          mensaje.textContent = "Usuario o contraseña incorrectos.";
          mensaje.classList.add("text-danger");
      }
  });
});
