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
const confirmar = document.getElementById('confirmar');
const formulario = document.getElementById("miFormulario");

// Manejar el clic en el botón de confirmar
confirmar.addEventListener("click", async (e) => {
    e.preventDefault(); // Evitar que el botón dispare el envío del formulario

    // Obtener los campos del formulario
    const anticipoAmountInput = document.getElementById("anticipoAmountInput");
    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const inputTelefono = document.getElementById('telefono');
    const inputReferencias = document.getElementById('referencias');
    const inputCoordenadas = document.getElementById('coordenadas');
    const inputTelefonocasa = document.getElementById('telefonocasa');
    const inputDomicilio = document.getElementById('Domicilio');
    const inputID = document.getElementById('ID');
    const inputpaquete = document.getElementById('paquete');
    const HoraFin = document.getElementById('HoraFin');
    const HoraInicio = document.getElementById('HoraInicio');
    const FechaFin = document.getElementById('FechaFin');
    const FechaInicio = document.getElementById('FechaInicio');
    const notas = document.getElementById("notas");
    const link1 = document.getElementById("urlDisplayINE");
    var link2 = document.getElementById("urlDisplayREVERSO");
    var link3 = document.getElementById("urlDisplayDOMICILIO");
    const inputcalle = document.getElementById("calle");
    const inputnumeroInt = document.getElementById("numeroInt");
    const inputnumeroExt = document.getElementById("numeroExt");
    const inputcp = document.getElementById("cp");
    const inputentreCalles = document.getElementById("entreCalles");
    


   
    try {

     //   console.log("HREFS",link1.href, "LINK", link1 );
        
        const docRef = await addDoc(collection(db, "ventas"), {
          cliente: inputNombre.value,
          paquete: inputpaquete.value,
          email: inputEmail.value,
          movil: inputTelefono.value,
          telefono: inputTelefonocasa.value,
          Entre_Calles: inputentreCalles.value, 
          CP: inputcp.value, 
          Número_Interior: inputnumeroInt.value, 
          Número_Exterior: inputnumeroExt.value, 
          Calle: inputcalle.value,
          referencias: inputReferencias.value,
          ubicacion: inputCoordenadas.value,
          notas: notas.value,
          fecha_instalacion: `${FechaInicio.value} - ${FechaFin.value}`,
          hora_instalacion: `HoraIni: ${HoraInicio.value}, HoraFin: ${HoraFin.value}`,
          ine_frontal: link1.href,
          ine_reverso: link2.href,  
          domicilio:link3.href,    
          anticipo: anticipoAmountInput.value,

        });
        
    } catch (e) {
        console.error("Error al agregar el documento: ", e);
    }
});
