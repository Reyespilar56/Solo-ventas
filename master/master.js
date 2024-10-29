document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("validate.datos");
  const mensaje = document.getElementById("mensaje");

  // Comprobar si el usuario está autenticado
  const auth = localStorage.getItem("auth");
  if (!auth) {
      // Si no hay autenticación, redirige al login
      window.location.href = "/master/master.html"; // Cambia esto a la URL de tu página de login
  }

  // Manejo del evento de envío del formulario
  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita el envío del formulario

      // Obtén los valores de los campos
      const usuario = document.getElementById("usuario").value;
      const contrasena = document.getElementById("contrasena").value;

      // Valida las credenciales
      if (usuario === "admin" && contrasena === "admin") { // Puedes cambiar estas credenciales
          // Si son correctas, redirige a otra página
          localStorage.setItem("auth", usuario); // Guarda el usuario en localStorage
          window.location.href = "/admin/administradores.html"; // Cambia esto a la URL de tu página de destino
      } else {
          // Si no son correctas, muestra un mensaje
          mensaje.textContent = "Usuario o contraseña incorrectos.";
          mensaje.classList.add("text-danger");
      }
  });
});
