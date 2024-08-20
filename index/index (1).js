document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('uploadForm');
  const fileInput = document.getElementById('fileInput');
  const messageElement = document.getElementById('message');

  if (form && fileInput && messageElement) {
      form.addEventListener('submit', async function (e) {
          e.preventDefault();
          
          const file = fileInput.files[0];
          
          if (!file) {
              messageElement.textContent = 'Please select a file to upload';
              return;
          }

          console.log('File selected:', file);

          const formData = new FormData();
          formData.append('file', file);

          try {
              console.log('Sending request to the server...');
              const response = await fetch('https://installations-calendar-back.vercel.app/drive/upload', {
                  method: 'POST',
                  body: formData,
                  headers: {
                      'Accept': 'application/json',
                  },
              });

              console.log('Response received:', response);

              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();
              console.log('Parsed response data:', data);
              messageElement.textContent = data.message + " URL: " + data.url;

          } catch (error) {
              console.error('Error uploading the file:', error);
              messageElement.textContent = `Error uploading the file: ${error.message}`;
          }
      });
  } else {
      console.error('One or more elements are not found in the DOM.');
  }
});
