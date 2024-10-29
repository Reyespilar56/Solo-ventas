// Obtiene el elemento del botón por su ID 
var bton = document.getElementById('bton');

// Obtiene el elemento de mensaje por su ID
var mensaje = document.getElementById('mensaje');

// Agrega un event listener al botón que escucha el evento 'click'
bton.addEventListener('click', function() {
  console.log("boton funcional"); // Muestra en la consola que el botón es funcional

  // Obtiene los valores de los campos del formulario por su ID
  var Nombre = document.getElementById('Nombre').value;
  var correoElectronico = document.getElementById('correoElectronico').value;
 
  var TelefonoMovil = document.getElementById('TelefonoMovil').value;
  
  var usuario = document.getElementById("usuario").value;
  var contrasena = document.getElementById('contrasena').value;
  var confirmarContrasena = document.getElementById('confirmarContrasena').value;

  // Genera un ID aleatorio para el usuario maximo de 150 
  var usuarioId = 'id-' + Math.floor(Math.random() * 150);

  // Muestra en la consola los datos obtenidos del formulario junto con el ID generado
  console.log("datos", usuarioId, Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, usuario, contrasena);

  // Valida el formulario y si es válido, envía la solicitud
  if (validarFormulario(Nombre, correoElectronico,TelefonoMovil, usuario, contrasena, confirmarContrasena)) {
    console.log("Validacion"); // Muestra en la consola que la validación fue exitosa
    enviarSolicitud(usuarioId, Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, usuario, contrasena);
  } 
});

// Función para validar los datos del formulario
function validarFormulario(nombre, correoElectronico,  TelefonoMovil,  usuario, contrasena, confirmarContrasena) {
  // Expresión regular para validar el formato del correo electrónico
  var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Valida que todos los campos no estén vacíos
  if (!nombre || !correoElectronico ||  !TelefonoMovil ||  !usuario || !contrasena || !confirmarContrasena) {
    mostrarMensaje('Por favor, complete todos los campos.', 'error');
    return false;
  }

  // Valida que el correo electrónico tenga un formato válido
  if (!regexCorreo.test(correoElectronico)) {
    mostrarMensaje('Por favor, ingrese un correo electrónico válido.', 'error');
    return false;
  }

  // Valida que las contraseñas coincidan
  if (contrasena !== confirmarContrasena) {
    mostrarMensaje('Las contraseñas no coinciden.', 'error');
    return false;
  }

  // Si todas las validaciones pasan, retorna verdadero
  return true;
}

// Función para mostrar mensajes en el HTML
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto; // Establece el texto del mensaje

  // Establece estilos para el mensaje
  mensaje.style.padding = '10px';
  mensaje.style.borderRadius = '5px';
  mensaje.style.marginTop = '10px';
  
  if (tipo === 'error') {
    mensaje.style.color = 'red';
    mensaje.style.backgroundColor = '#f8d7da';
    mensaje.style.border = '1px solid red';

  } else if (tipo === 'success') {
    mensaje.style.color = 'green';
    mensaje.style.backgroundColor = '#f8d7da';
    mensaje.style.border = '1px solid green';
  }
}

// Función para enviar la solicitud al servidor usando axios
function enviarSolicitud(usuarioId, Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, usuario, contrasena) {
  console.log("solicitud enviada"); // Muestra en la consola que la solicitud fue enviada

  // Realiza una petición POST al servidor con los datos del usuario y headers personalizados
  /*axios.post('https://us-central1-ventasdigy-ce0eb.cloudfunctions.net/addUser', 
      {
        "clave": contrasena,
        "movil": TelefonoMovil,
        "correo": correoElectronico,
        "direccion": Direccion,
        "telefono": Telefono,
        "usuario": usuario,
        "nombre": Nombre,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    .then(function (response) {
      console.log("respuesta", response.data); // Muestra la respuesta del servidor en la consola
      mostrarMensaje('Usuario agregado correctamente: ' + JSON.stringify(response.data), 'success'); // Muestra un mensaje de éxito con los datos
    })
    .catch(function (error) {
      console.log(error); // Muestra el error en la consola si la petición falla
      mostrarMensaje('Hubo un error al registrar al Usuario.', 'error'); // Muestra un mensaje de error
    });*/
}
