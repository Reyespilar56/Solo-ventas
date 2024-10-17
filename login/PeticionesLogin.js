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

// Función para validar el formulario (puedes ajustar esto según tus necesidades)
function validarFormulario(usuario, contrasena) {
    if (usuario && contrasena) {
        return true;
    }
    alert('Por favor, completa todos los campos.');
    return false;
}



  // Función para recibir datos del servidor
async function recibirDatos(usuario, clave) {
    console.log("Recibiendo datos"); // Muestra en la consola que se está recibiendo datos

    try {
        // Realiza la solicitud GET al servidor con headers
        const respuesta = await axios.post('https://us-central1-ventasdigy-ce0eb.cloudfunctions.net/validateUser', 
      
             {
                "usuario": usuario,
                "clave": clave // Se cambió "clave" a "contrasena" para que coincida con el parámetro de la función
            },
            {
            headers: {
                'Content-Type': 'application/json', 
            }
        }
    )

        console.log("DATOS VALIDADOS ", respuesta);

        // Verifica si la respuesta es exitosa y redirige si es el caso
        if (respuesta.status === 200) {
            localStorage.setItem("auth", clave);
            window.location.href = '/index/index.html'; // Redirige 
        } else {
            alert("Error al ingresar: Credenciales incorrectas.");
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        alert('Contraseña o Usuario incorrecto'
        
        );

    }
}
