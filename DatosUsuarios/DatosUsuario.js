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

    // Muestra en la consola los datos obtenidos del formulario
    console.log("datos", Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, usuario, contrasena);

    // Valida el formulario y si es válido, envía la solicitud
    if (validarFormulario(Nombre, correoElectronico, Telefono, TelefonoMovil, Direccion, usuario, contrasena, confirmarContrasena)) {
        console.log("Validacion"); // Muestra en la consola que la validación fue exitosa
        // Aquí iría la función para enviar la solicitud
        mostrarMensaje('Formulario enviado correctamente.'); // Mensaje de éxito
    } 
});

// Función para mostrar mensajes en el elemento de mensaje
function mostrarMensaje(texto) {
    mensaje.textContent = texto; // Cambia el contenido del elemento de mensaje
    // Estilos para el mensaje
    mensaje.style.color = 'white'; // Color del texto
    mensaje.style.backgroundColor = 'red'; // Fondo verde
    mensaje.style.padding = '10px'; // Espaciado interno
    mensaje.style.borderRadius = '5px'; // Bordes redondeados
    mensaje.style.marginTop = '5px'; // Margen superior
    mensaje.style.display = 'block'; // Asegura que se muestre como un bloque
    console.log(texto); // También muestra el mensaje en la consola
}

// Función para validar los datos del formulario
function validarFormulario(nombre, correoElectronico,  TelefonoMovil,  usuario, contrasena, confirmarContrasena) {
    // Expresión regular para validar el formato del correo electrónico
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// Función para mostrar mensajes en el elemento mensaje
function mostrarMensaje(texto, tipo = 'success') {
    // Selecciona el elemento mensaje y establece su texto
    mensaje.textContent = texto;
    mensaje.style.padding = '10px';
    mensaje.style.borderRadius = '5px';
    mensaje.style.marginTop = '10px';

    if (tipo === 'error') {
        // Estilos para el mensaje de error
        mensaje.style.color = 'red'; // Texto en rojo
        mensaje.style.backgroundColor = '#f8d7da'; // Fondo rosado
        mensaje.style.border = '1px solid red'; // Borde rojo
    } else {
        // Estilos para el mensaje de éxito
        mensaje.style.color = 'green'; // Texto en verde
        mensaje.style.backgroundColor = '#d4edda'; // Fondo verde claro
        mensaje.style.border = '1px solid green'; // Borde verde
    }
}

// Validación de campos obligatorios
if (!nombre) {
    mostrarMensaje('Por favor, ingrese su nombre.', 'error'); // Mensaje de error
    return false;
}
if (!correoElectronico || !regexCorreo.test(correoElectronico)) {
    mostrarMensaje('Por favor, ingrese un correo electrónico válido.', 'error'); // Mensaje de error
    return false;
}
if (!TelefonoMovil) {
    mostrarMensaje('Por favor, ingrese su teléfono móvil.', 'error'); // Mensaje de error
    return false;
}
if (!usuario) {
    mostrarMensaje('Por favor, ingrese un usuario.', 'error'); // Mensaje de error
    return false;
}
if (!contrasena) {
    mostrarMensaje('Por favor, ingrese una contraseña válida.', 'error'); // Mensaje de error
    return false;
}
if (contrasena !== confirmarContrasena) {
    mostrarMensaje('Las contraseñas no coinciden.', 'error'); // Mensaje de error
    return false;
}

// Si todas las validaciones pasan, muestra un mensaje de éxito
mostrarMensaje('Registro exitoso.', 'success'); // Mensaje de éxito
// Si todas las validaciones pasan, retorna verdadero
return true;
}
