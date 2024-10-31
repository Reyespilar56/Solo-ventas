
// // Importar Firebase y Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBJHnr-Hc_dt-F85UjYqcEHfrPWSQfdips",
  authDomain: "ventas-e21f2.firebaseapp.com",
  projectId: "ventas-e21f2",
  storageBucket: "ventas-e21f2.appspot.com",
  messagingSenderId: "714192701317",
  appId: "1:714192701317:web:46cc73ccce5af60e0d26ec"
};
// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a los elementos del DOM
const selectTipoBusqueda = document.getElementById('selectTipoBusqueda');
const divZona = document.getElementById('divZona');
const divUsuario = document.getElementById('divUsuario');
const divTelefono = document.getElementById('divTelefono');

const divCliente = document.getElementById('divCliente');
const divFecha = document.getElementById('divFecha');
const btnCalcularUsuario = document.getElementById('btnCalcularUsuario');
const btnCalcularGenerales = document.getElementById('btnCalcularGenerales');
const resultTableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
const mensaje = document.getElementById('mensaje');

// Mostrar el campo de búsqueda adecuado según el tipo seleccionado
selectTipoBusqueda.addEventListener('change', () => {
  divZona.style.display = 'none';
  divUsuario.style.display = 'none';
  divTelefono.style.display = 'none';
  divCliente.style.display = 'none';
  divFecha.style.display = 'none';

  

  const tipo = selectTipoBusqueda.value;
  if (tipo === 'zona') divZona.style.display = 'block';
  if (tipo === 'usuario') divUsuario.style.display = 'block';
  if (tipo === 'telefono') divTelefono.style.display = 'block';
  if (tipo === 'cliente') divCliente.style.display = 'block';
  if (tipo === 'fecha') divFecha.style.display = 'block';
});

// Función para realizar la búsqueda por usuario
btnCalcularUsuario.addEventListener('click', async () => {
  const tipoBusqueda = selectTipoBusqueda.value;
  let valorBusqueda = '';

  if (tipoBusqueda === 'zona') valorBusqueda = document.getElementById('valorZona').value;
  if (tipoBusqueda === 'usuario') valorBusqueda = document.getElementById('valorUsuario').value;
  if (tipoBusqueda === 'telefono') valorBusqueda = document.getElementById('valorTelefono').value;
  if (tipoBusqueda === 'cliente') valorBusqueda = document.getElementById('valorCliente').value;
  if (tipoBusqueda === 'fecha') valorBusqueda = document.getElementById('valorFecha').value;

  try {
    const resultados = await buscarVentasPorTipo(tipoBusqueda, valorBusqueda);
    mostrarResultados(resultados);
  } catch (error) {
    mensaje.innerText = 'Error al buscar ventas: ' + error.message;
  }
});

// Función para calcular las ventas generales
btnCalcularGenerales.addEventListener('click', async () => {
  try {
    const resultados = await obtenerVentasGenerales();
    mostrarResultados(resultados);
  } catch (error) {
    mensaje.innerText = 'Error al calcular ventas generales: ' + error.message;
  }
});

// Función para mostrar los resultados en la tabla
function mostrarResultados(resultados) {
  resultTableBody.innerHTML = '';
//  <td>${venta.usuario}</td> 
     // <td>${venta.ID_venta}</td>  
  resultados.forEach(venta => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${venta.cliente}</td>
            <td>${venta.Calle}</td>
            <td>${venta.ubicacion}</td>
            <td>${venta.fecha_instalacion}</td>
            <td>${venta.movil}</td>
         
            <td>${venta.email}</td>
           <td>${venta.anticipo}</td>
           <td>${venta.notas}</td>
        `;
    resultTableBody.appendChild(row);
  });
}

// Función para buscar ventas por tipo en Firestore
async function buscarVentasPorTipo(tipo, valor) {
  const ventasRef = collection(db, 'ventas');
  let q;

  // Construcción de la consulta basada en el tipo de búsqueda
  switch (tipo) {
    case 'zona':
      q = query(ventasRef, where('zona', '==', valor));
      break;
    case 'usuario':
      q = query(ventasRef, where('usuario', '==', valor));
      break;
    case 'telefono':
      q = query(ventasRef, where('telefono', '==', valor));
      break;
    case 'cliente':
      q = query(ventasRef, where('cliente', '==', valor));
      break;
    case 'fecha':
      q = query(ventasRef, where('fechaInstalacion', '==', valor));
      break;
    default:
      throw new Error('Tipo de búsqueda no válido');
  }

  const querySnapshot = await getDocs(q);
  const resultados = [];
  querySnapshot.forEach((doc) => {
    resultados.push(doc.data());
  });

  return resultados;
}

// Función para obtener todas las ventas generales
async function obtenerVentasGenerales() {
  const ventasRef = collection(db, 'ventas');
  const querySnapshot = await getDocs(ventasRef);
  const resultados = [];
  querySnapshot.forEach((doc) => {
    resultados.push(doc.data());
  });

  return resultados;
}
