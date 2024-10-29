// Obtiene el elemento del botón por su ID
var button = document.getElementById('json_post');

// Agrega un event listener al botón que escucha el evento 'click'
button.addEventListener('click', function() {
    console.log("boton funcional"); // Muestra en la consola que el botón es funcional

    // Obtiene los valores de los campos del formulario por su ID
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById('contrasena').value;

    // Valida el formulario y si es válido, envía la solicitud
    if (validarFormulario(usuario, contrasena)) {
        console.log("Validacion"); // Muestra en la consola que la validación fue exitosa
        recibirDatos(usuario, contrasena);
    }
});

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

// Función para validar el formulario
function validarFormulario(usuario, contrasena) {
    if (usuario && contrasena) {
        return true;
    }
    mostrarMensajeError('Por favor, completa todos los campos.');
    return false;
}

// Función para recibir datos del servidor
async function recibirDatos(usuario, clave) {
    console.log("Recibiendo datos"); // Muestra en la consola que se está recibiendo datos

    try {
        // Realiza la solicitud POST al servidor con headers
        const respuesta = await axios.post(
            'https://us-central1-ventasdigy-ce0eb.cloudfunctions.net/validateUser',
            {
                "usuario": usuario,
                "clave": clave
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("DATOS VALIDADOS ", respuesta);

        // Verifica si la respuesta es exitosa y redirige si es el caso
        if (respuesta.status === 200) {
            localStorage.setItem("auth", clave);
            window.location.href = '/index/index.html'; // Redirige
        } else {
            mostrarMensajeError("Error al ingresar: Credenciales incorrectas.");
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        mostrarMensajeError('Contraseña o Usuario incorrecto');
    }
}
