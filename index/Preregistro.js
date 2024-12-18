document.addEventListener('DOMContentLoaded', function () {
  // Obtener referencia a los botones y elementos del formulario
  var mensaje = document.getElementById('mensaje');
  var inputNombre = document.getElementById('nombre');
  const inputEmail = document.getElementById('email');
  const inputTelefono = document.getElementById('telefono');
  const inputReferencias = document.getElementById('referencias');
  const inputCoordenadas = document.getElementById('coordenadas');
  const inputTelefonocasa = document.getElementById('telefonocasa');
  var inputDomicilio = document.getElementById('Domicilio');
  const inputID = document.getElementById('ID');
  const inputpaquete = document.getElementById('paquete');
  const HoraFin = document.getElementById('HoraFin');
  const HoraInicio = document.getElementById('HoraInicio');
  const FechaFin = document.getElementById('FechaFin');
  const FechaInicio = document.getElementById('FechaInicio');
  const notas = document.getElementById("notas");
  const link1 = document.getElementById("urlDisplayINE");
  const link2 = document.getElementById("urlDisplayREVERSO");
  const link3 = document.getElementById("urlDisplayDOMICILIO");
  const inputcalle = document.getElementById("calle");
  const inputnumeroInt = document.getElementById("numeroInt");
  const inputnumeroExt = document.getElementById("numeroExt");
  const inputcp = document.getElementById("cp");
  const inputentreCalles = document.getElementById("entreCalles");
  const confirmar = document.getElementById('confirmar');
  var anticipoAmountInput = document.getElementById("anticipoAmountInput");
  const defaultUrl = "http://127.0.0.1:5500/index/index.html";
  

  // Generar un ID aleatorio
  function generateRandomID() {
    const chars = '0123456789';
    let randomID = '';
    for (let i = 0; i < 10; i++) {
      randomID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomID;
  }
  confirmar.addEventListener('click', function () {
    // Validar campos necesarios
    const requiredFields = [
      inputcalle,
      inputcp,
  inputnumeroExt,
  inputentreCalles,
  inputReferencias,
  inputCoordenadas,
  inputpaquete,
  anticipoAmountInput,
      inputNombre,
      inputTelefono,
      FechaInicio,
      FechaFin,
      HoraInicio,
      HoraFin
    ];
  
    let allFieldsFilled = true;
  
    // Verificar si todos los campos requeridos están llenos
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        allFieldsFilled = false;
        field.classList.add('input-error'); // Añadir clase para marcar campo como erróneo
        // Puedes mostrar un mensaje específico para cada campo si lo deseas
      } else {
        field.classList.remove('input-error'); // Quitar error si el campo está lleno
      }
    });
    
  
    if (!allFieldsFilled) {
      mensaje.innerHTML = 'Por favor, completa todos los campos requeridos.';
      mensaje.style.display = 'block';
      return; // Detener la ejecución si hay campos vacíos
    }
  
    var randomid = generateRandomID();
    inputID.value = "cambaceo-" + localStorage.getItem("auth") + "-" + randomid;
  
    // Muestra el ícono de carga y mensaje
    mensaje.innerHTML = '<div class="loading-icon"></div> Confirmando venta...';
    mensaje.style.display = 'block';
  
    axios.post('http://localhost:3000/instalacion', {
      data: {
        "Cobro": `${anticipoAmountInput.value}`,
        "token": "Smx2SVdkbUZIdjlCUlkxdFo1cUNMQT09",
        "Nombre": inputNombre.value,
        "email": inputEmail.value,
        "telefono": inputTelefono.value,
        "telefonocasa": inputTelefonocasa.value,
        "domicilio": `
          \nEntre Calles: ${inputentreCalles.value}
          \nC.P.: ${inputcp.value}
          \nNúmero Interior: ${inputnumeroInt.value}
          \nNúmero Exterior: ${inputnumeroExt.value}
          \nCalle: ${inputcalle.value}`,
        "referencias": inputReferencias.value,
        "coordenadas": inputCoordenadas.value,
        "ID": inputID.value,
        "paquete": inputpaquete.value,
        "FechaFin": FechaFin.value,
        "FechaIni": FechaInicio.value,
        "HoraIni": HoraInicio.value,
        "HoraFin": HoraFin.value,
        "URL_INE": (link1.href === "" || link1.href === defaultUrl) ? "" : link1.href,
        "URL_REVERSO": (link2.href === "" || link2.href === defaultUrl) ? "" : link2.href,
        "URL_DOMICILIO": (link3.href === "" || link3.href === defaultUrl) ? "" : link3.href,
        "notas": notas.value
      }
    })
    .then(function (response) {
      console.log("respuesta", response);
      if (response.status === 200) {
        if (response.data && response.data.idcliente) {
          setTimeout(() => {
            mensaje.innerHTML = 'Venta confirmada: ' + response.data.idcliente;
            mensaje.style.display = 'block';
            window.location.reload(); // Recargar la página
          }, 1);
        } else {
          setTimeout(() => {
            mensaje.innerHTML = 'Venta confirmada. ID de cliente generado.';
            mensaje.style.display = 'block';
            window.location.reload(); // Recargar la página
          }, 10000);
        }
      } else {
        console.error('Error:', response.status, response.data);
        mensaje.innerHTML = 'Error al enviar la venta.';
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
      mensaje.innerHTML = 'Error de red o de conexión.';
    });
  });
  
  



  // Verificar el estado de autenticación al cargar la página protegida
  window.onload = function () {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      window.location.href = 'http://127.0.0.1:5500/login/Login.html';
    }
  }

  const botonEncontrar = document.getElementById('encontrar');
  const Coordenadas = document.getElementById('coordenadas');
  console.log("Botón encontrado:", botonEncontrar);

  if (botonEncontrar && Coordenadas) {
    botonEncontrar.addEventListener('click', function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (posicion) {
          const latitud = posicion.coords.latitude;
          const longitud = posicion.coords.longitude;
          inputCoordenadas.value = ` ${latitud},${longitud}`;
        }, function (error) {
          console.error("Error obteniendo la ubicación: ", error);
          inputCoordenadas.value = "No se pudo obtener tu ubicación.";
        });
      } else {
        console.error("La geolocalización no es soportada por este navegador.");
        inputCoordenadas.value = "Tu navegador no soporta geolocalización.";
      }
    });
  } else {
    console.error("No se encontró el botón con el ID 'encontrar' o el input con el ID 'coordenadas'");
  }

  const botonEnviar = document.getElementById('json_post');
  const modal = document.getElementById('myModal');
  const cancelarBtn = document.querySelector('.modal-content .btn-danger');
  const resumenLista = document.getElementById('resumenDatos');

  function mostrarResumen(datos) {
    resumenLista.innerHTML = '';
    for (const propiedad in datos) {
      const li = document.createElement('li');
      li.textContent = `${datos[propiedad].nombre}: ${datos[propiedad].valor}`;
      resumenLista.appendChild(li);
    }
  }

 
  
    botonEnviar.addEventListener('click', () => {
      const datos = {
        Nombre_Cliente: {valor: document.getElementById('nombre').value, nombre: "Nombre Cliente"},
        Email: {valor: document.getElementById('email').value, nombre: "Email"},
        Telefono: {valor: document.getElementById('telefono').value, nombre: "Telefono"},
        Referencias: {valor: document.getElementById('referencias').value, nombre: "Referencia"},
        Coordenadas: {valor: document.getElementById('coordenadas').value, nombre: "Coordenadas"},
        Telefonocasa: {valor: document.getElementById('telefonocasa').value, nombre: "Telefono Casa"},
        paquete: {valor: document.getElementById('paquete').value, nombre: "paquete"},
        En_Horario_de: {valor: document.getElementById('HoraInicio').value, nombre: "En horario de"},
        FechaFin: {valor: document.getElementById('HoraFin').value, nombre: "A "},
        Fecha_de: {valor: document.getElementById('FechaInicio').value, nombre: "Fecha de "},
        A: {valor: document.getElementById('FechaFin').value, nombre: "A "},
        notas: {valor: document.getElementById("notas").value, nombre: "Notas"},
        calle: {valor: document.getElementById("calle").value, nombre: "Calle"},
        numero_Int: {valor: document.getElementById("numeroInt").value, nombre: "Numero Int"},
        numero_Ext: {valor: document.getElementById("numeroExt").value, nombre: "Numero Ext"},
        Codigo_Postal: {valor: document.getElementById("cp").value, nombre: "Codigo Postal"},
        Entre_Calles: {valor: document.getElementById("entreCalles").value, nombre: "Entre Calles"},
        
      };
      mostrarResumen(datos);
      modal.style.display = 'block';
    });
  
    cancelarBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
  
  });
  const anticipoSelect = document.getElementById("Anticipo");
  const anticipoAmountDiv = document.getElementById("anticipoAmount");
  
  anticipoSelect.addEventListener("change", () => {
      if (anticipoSelect.value === "SI") {
          anticipoAmountDiv.style.display = "block";
      } else {
          anticipoAmountDiv.style.display = "none";
      }
      
  });
  

// inputNombre.js
