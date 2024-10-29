document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("validate.datos");
    const mensaje = document.getElementById("mensaje");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita el envío del formulario
  
      // Obtén los valores de los campos
      const usuario = document.getElementById("usuario").value;
      const contrasena = document.getElementById("contrasena").value;
  
      // Valida las credenciales
      if (usuario === "coorporativo" && contrasena === "123") { // preguntar que usuario y contraseña ocupar 
        // Si son correctas, redirige a otra página
        window.location.href = "/admin/administradores.html"; // Cambia esto a la URL de tu página de destino
      } else {
        // Si no son correctas, muestra un mensaje
        mensaje.textContent = "Usuario o contraseña incorrectos.";
        mensaje.classList.add("text-danger");
      }
    });
  });
  