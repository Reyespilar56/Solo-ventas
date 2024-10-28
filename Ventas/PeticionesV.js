import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


// // firebaseconfig.js
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
//  import{getAuth} from 'firebase/auth';


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
// const auth = getAuth(app);


var buttonGenerales = document.getElementById('btnCalcularGenerales');
var buttonUsuario = document.getElementById('btnCalcularUsuario');
var selectFiltro = document.getElementById('selectTipoBusqueda');
var mensaje = document.getElementById('mensaje');
var resultTable = document.getElementById('resultTable');
var tableBody = resultTable.querySelector('tbody');

// Elementos de los campos de búsqueda
var divZona = document.getElementById('divZona');
var divUsuario = document.getElementById('divUsuario');
var divTelefono = document.getElementById('divTelefono');
var divCliente = document.getElementById('divCliente');
var divFecha = document.getElementById('divFecha');

// // Lógica para mostrar/ocultar campos según el filtro seleccionado
// selectFiltro.addEventListener('change', function() {
//     divZona.style.display = 'none';
//     divUsuario.style.display = 'none';
//     divTelefono.style.display = 'none';
//     divCliente.style.display = 'none';
//     divFecha.style.display = 'none';

//     var filtroTipo = selectFiltro.value;

//     if (filtroTipo === 'zona') {
//         divZona.style.display = 'block';
//     } else if (filtroTipo === 'usuario') {
//         divUsuario.style.display = 'block';
//     } else if (filtroTipo === 'telefono') {
//         divTelefono.style.display = 'block';
//     } else if (filtroTipo === 'cliente') {
//         divCliente.style.display = 'block';
//     } else if (filtroTipo === 'fecha') {
//         divFecha.style.display = 'block';
//     }
// });

// // Inicializar campos visibles
// selectFiltro.dispatchEvent(new Event('change'));

// buttonGenerales.addEventListener('click', function() {
//     procesarFormulario('generales');
// });

// buttonUsuario.addEventListener('click', function() {
//     console.log('FILTRO', selectFiltro.value);
//     procesarFormulario(selectFiltro.value);
// });

// function procesarFormulario(filtroTipo) {
//     console.log("botón funcional");

//     // Verifica si el filtro es 'fecha' antes de intentar acceder a Fecha
//     var fechaValor = '';
//     if (filtroTipo === 'fecha') {
//         var Fecha = document.getElementById("Fecha");
//         if (Fecha) {
//             fechaValor = Fecha.value;
//         } else {
//             console.error("El elemento con ID 'Fecha' no existe en el DOM.");
//             return; // Detenemos la ejecución si el filtro es fecha pero el elemento no está presente
//         }
//     }

//     var Valor = "";
//     if (filtroTipo === 'zona') {
//         Valor = document.getElementById("valorZona").value;
//     } else if (filtroTipo === 'usuario') {
//         Valor = document.getElementById("valorUsuario").value;
//     } else if (filtroTipo === 'telefono') {
//         Valor = document.getElementById("valorTelefono").value;
//     } else if (filtroTipo === 'cliente') {
//         Valor = document.getElementById("valorCliente").value;
//     } else if (filtroTipo === 'fecha') {
//         Valor = fechaValor;
//     }

    

 //  recibirDatos(Valor, filtroTipo, fechaValor);
//}
// function recibirDatos(Valor, filtroTipo) {
//     console.log("Recibiendo datos");
//     axios.get('http://localhost:3000/Historial', {
//         params: {
//             valor: Valor,
//             filtroTipo: filtroTipo // Enviar filtroTipo al servidor
//         },
//     })
//     .then(function(res) {
//         console.log("Respuesta", res);
//         if (res.status === 200) {
//             // Procesar datos y actualizar la tabla
//             actualizarTabla(res.data);
//         }
//     })
//     .catch(function(err) {
//         console.error(err);
//         alert('No se encontraron datos');
//     });
// }

// function actualizarTabla(data) {
//     // Mostrar la tabla
//     resultTable.style.display = 'table';

//     // Limpiar el cuerpo de la tabla
//     tableBody.innerHTML = '';

//     if (data.length > 0) {
//         // Iterar sobre los datos y agregar filas a la tabla
//         data.forEach(item => {
//             const row = document.createElement('tr');ter

//             const fields = [
//                 'usuario', 'cliente', 'direccion','ubicacion','fecha_instalacion',
//                 'telefono','movil', 'email', 'notas'
//             ];

//             fields.forEach(field => {
//                 const cell = document.createElement('td');
//                 cell.textContent = item[field] || ''; // Manejo de valores nulos
//                 row.appendChild(cell);
//             });

//             tableBody.appendChild(row);
//         });
//         mensaje.textContent = ''; // Limpiar el mensaje si hay datos
//     } else {
//         mensaje.textContent = 'No se encontraron datos.';
//     }
//}
var buttonGenerales = document.getElementById('btnCalcularGenerales');
var buttonUsuario = document.getElementById('btnCalcularUsuario');
var selectFiltro = document.getElementById('selectTipoBusqueda');
var mensaje = document.getElementById('mensaje');
var resultTable = document.getElementById('resultTable');
var tableBody = resultTable.querySelector('tbody');

// Elementos de los campos de búsqueda
var divZona = document.getElementById('divZona');
var divUsuario = document.getElementById('divUsuario');
var divTelefono = document.getElementById('divTelefono');
var divCliente = document.getElementById('divCliente');
var divFecha = document.getElementById('divFecha');

// Lógica para mostrar/ocultar campos según el filtro seleccionado
selectFiltro.addEventListener('change', function() {
    divZona.style.display = 'none';
    divUsuario.style.display = 'none';
    divTelefono.style.display = 'none';
    divCliente.style.display = 'none';
    divFecha.style.display = 'none';

    var filtroTipo = selectFiltro.value;

   if (filtroTipo === 'usuario') {
        divUsuario.style.display = 'block';
    } else if (filtroTipo === 'telefono') {
        divTelefono.style.display = 'block';
    } else if (filtroTipo === 'cliente') {
        divCliente.style.display = 'block';
    } else if (filtroTipo === 'fecha') {
        divFecha.style.display = 'block';
    }
});

// Inicializar campos visibles
selectFiltro.dispatchEvent(new Event('change'));

buttonGenerales.addEventListener('click', function() {
    procesarFormulario('generales');
});

buttonUsuario.addEventListener('click', function() {
    console.log('FILTRO', selectFiltro.value);
    procesarFormulario(selectFiltro.value);
});

function procesarFormulario(filtroTipo) {
    console.log("botón funcional");

    // Intenta obtener el elemento 'Fecha' y verifica si existe
    var Fecha = document.getElementById("Fecha");
    var fechaValor = Fecha ? Fecha.value : ''; // Asigna un valor vacío si 'Fecha' no existe
    var Valor = "";

    if (filtroTipo === 'zona') {
        Valor = document.getElementById("valorZona").value;
    } else if (filtroTipo === 'usuario') {
        Valor = document.getElementById("valorUsuario").value;
    } else if (filtroTipo === 'telefono') {
        Valor = document.getElementById("valorTelefono").value;
    } else if (filtroTipo === 'cliente') {
        Valor = document.getElementById("valorCliente").value;
    } else if (filtroTipo === 'fecha' && Fecha) {
        Valor = fechaValor;
    }

    recibirDatos(Valor, filtroTipo);
}


function recibirDatos(filtroTipo, Valor) {
    console.log("Recibiendo datos de Firebase");

    // Obtener referencia a la colección
    const ventasRef = db.collection('ventas'); // Cambia 'usuarios' por 'ventas' si necesitas datos de ventas

    let query = ventasRef;

    // Filtrar según el tipo de filtro
    if (filtroTipo === 'zona') {
        query = query.where('zona', '==', Valor);
    } else if (filtroTipo === 'usuario') {
        query = query.where('usuario', '==', Valor);
    } else if (filtroTipo === 'movil') {
        query = query.where('movil', '==', Valor);
    } else if (filtroTipo === 'cliente') {
        query = query.where('cliente', '==', Valor);
    } else if (filtroTipo === 'fecha') {
        query = query.where('fecha_instalacion', '==', new Date(Valor));
    }
    // Agregar más filtros según sea necesario

    // Realiza la consulta
    query.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No se encontraron datos.');
                mensaje.textContent = 'No se encontraron datos.';
                return;
            }

            // Mapea los documentos obtenidos
            const data = snapshot.docs.map(doc => ({
                id: doc.id,      // Aquí se guarda el ID generado por Firestore
                ...doc.data()    // Aquí se obtienen los datos del documento
            }));

            console.log("Datos recibidos:", data);

            // Actualizar la tabla con los datos
            actualizarTabla(data);
        })
        .catch(error => {
            console.error("Error al obtener datos de Firebase:", error);
            alert('Error al obtener datos de Firebase');
        });
}





