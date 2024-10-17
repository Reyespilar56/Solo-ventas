const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startCameraButton = document.getElementById('startCameraButton');
// const captureButton = document.getElementById('captureButton');
const stopCameraButton = document.getElementById('closeCamera');
const photos = [
    document.getElementById('photo1'),
    document.getElementById('photo2'),
    document.getElementById('photo3')
];
const fileInputs = document.querySelectorAll('.file-input');
let currentPhotoIndex = 0;


async function uploadPhoto(PhotoData, buttonType) {
    const byteString = atob(PhotoData.split(',')[1]);
    const buffer = new Uint8Array(new ArrayBuffer(byteString.length));
    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([buffer], { type: 'image/jpeg' });

    const formData = new FormData();
    formData.append('file', blob, `${buttonType}.jpeg`);

    const response = await axios.post('https://installations-calendar-back.vercel.app/drive/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Response received:', response);
    return response.data;
  }


// Manejar la selección de archivos desde la galería/explorador
fileInputs.forEach(input => {
    var inputNombre = document.getElementById('nombre');
    var fotoData;

    input.addEventListener('change', (event) => {
        console.log("Evento iniciado");
        
        const file = event.target.files[0];
        const photoIndex = event.target.getAttribute('data-photo-index');
        console.log("FILE", file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = async function(e) {
                photos[photoIndex].src = e.target.result;
                fotoData = e.target.result;

                console.log("photoIndex",photoIndex);
                console.log("fotoData",fotoData);
                if (photoIndex == "0") {
                    const respuesta = await uploadPhoto(fotoData, 'INE' + inputNombre.value);
                    console.log("RESPUESTA INE", respuesta);
                    if (respuesta.status == "ok") {
                        const newSrc = `https://drive.google.com/file/d/${respuesta.id}/preview`; // Definir newSrc aquí
                        const urlDisplay = document.getElementById('urlDisplayINE'); // Asegúrate de tener un elemento con este ID en tu HTML
                            if (urlDisplay) {
                            urlDisplay.href = newSrc; // Mostrar la URL en texto
                            }
                    }
                }
                else if (photoIndex == "1") {
                    const respuesta = await uploadPhoto(fotoData, 'REVERSO' + inputNombre.value);
                    console.log("RESPUESTA REVERSO", respuesta);

                    if (respuesta.status == "ok") {
                        const newSrc = `https://drive.google.com/file/d/${respuesta.id}/preview`; // Definir newSrc aquí
                        const urlDisplay = document.getElementById('urlDisplayREVERSO'); // Asegúrate de tener un elemento con este ID en tu HTML
                            if (urlDisplay) {
                            urlDisplay.href = newSrc; // Mostrar la URL en texto
                            }
                    }
                }
                else{
                    const respuesta = await uploadPhoto(fotoData, 'DOMICILIO' + inputNombre.value);
                    console.log("RESPUESTA DOMICILIO", respuesta);
                
                    if (respuesta.status == "ok") {
                        const newSrc = `https://drive.google.com/file/d/${respuesta.id}/preview`; // Definir newSrc aquí
                        const urlDisplay = document.getElementById('urlDisplayDOMICILIO'); // Asegúrate de tener un elemento con este ID en tu HTML
                            if (urlDisplay) {
                               urlDisplay.href = newSrc; // Mostrar la URL en texto
                            }
                    }
                }
            };
            reader.readAsDataURL(file);
        }
        
    });
});