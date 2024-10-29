
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const startCameraButton = document.getElementById('startCameraButton');
    const stopCameraButton = document.getElementById('closeCamera');
    const photos = [
        document.getElementById('photo1'),
        document.getElementById('photo2'),
        document.getElementById('photo3')
    ];
    const fileInputs = document.querySelectorAll('.file-input');
    const inputNombre = document.getElementById('nombre');
    let currentPhotoIndex = 0;

    // Deshabilitar los botones al inicio
    startCameraButton.disabled = true;
    stopCameraButton.disabled = true;
    fileInputs.forEach(input => input.disabled = true);

    // Habilitar botones solo si hay un nombre ingresado
    inputNombre.addEventListener('input', () => {
        const nombre = inputNombre.value.trim();
        const botonesHabilitados = nombre.length > 0;
        startCameraButton.disabled = !botonesHabilitados;
        stopCameraButton.disabled = !botonesHabilitados;
        fileInputs.forEach(input => input.disabled = !botonesHabilitados);
    });

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
        let fotoData;

        input.addEventListener('change', (event) => {
            console.log("Evento iniciado");

            const file = event.target.files[0];
            const photoIndex = event.target.getAttribute('data-photo-index');
            console.log("FILE", file);

            if (file) {
                const reader = new FileReader();
                reader.onload = async function (e) {
                    photos[photoIndex].src = e.target.result;
                    fotoData = e.target.result;

                    if (photoIndex === "0") {
                        const respuesta = await uploadPhoto(fotoData, 'INE' + inputNombre.value);
                        console.log("RESPUESTA INE", respuesta);
                        if (respuesta.status === "ok") {
                            const newSrc = `https://drive.google.com/file/d/${respuesta.id}/preview`;
                            const urlDisplay = document.getElementById('urlDisplayINE');
                            if (urlDisplay) {
                                urlDisplay.href = newSrc;
                            }
                        }
                    }
                    else if (photoIndex === "1") {
                        const respuesta = await uploadPhoto(fotoData, 'REVERSO' + inputNombre.value);
                        console.log("RESPUESTA REVERSO", respuesta);
                        if (respuesta.status === "ok") {
                            const newSrc = `https://drive.google.com/file/d/${respuesta.id}/preview`;
                            const urlDisplay = document.getElementById('urlDisplayREVERSO');
                            if (urlDisplay) {
                                urlDisplay.href = newSrc;
                            }
                        }
                    }
                    else {
                        const respuesta = await uploadPhoto(fotoData, 'DOMICILIO' + inputNombre.value);
                        console.log("RESPUESTA DOMICILIO", respuesta);
                        if (respuesta.status === "ok") {
                            const newSrc = `https://drive.google.com/file/d/${respuesta.id}/preview`;
                            const urlDisplay = document.getElementById('urlDisplayDOMICILIO');
                            if (urlDisplay) {
                                urlDisplay.href = newSrc;
                            }
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const fileInputs = document.querySelectorAll('.file-input');
    const inputNombre = document.getElementById('nombre');
    
    // Deshabilitar los inputs de selección de archivo al inicio
    fileInputs.forEach(input => input.disabled = true);

    // Habilitar inputs de selección de archivo solo si hay un nombre ingresado
    inputNombre.addEventListener('input', () => {
        const nombreIngresado = inputNombre.value.trim();
        
        // Habilita los inputs solo si hay un nombre
        const habilitarInputs = nombreIngresado.length > 0;
        fileInputs.forEach(input => input.disabled = !habilitarInputs);
    });
});
