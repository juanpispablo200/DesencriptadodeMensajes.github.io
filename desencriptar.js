document.getElementById('imageInput').addEventListener('change', loadImage);
document.getElementById('decryptButton').addEventListener('click', decryptMessage);

let imageCanvas = document.getElementById('imageCanvas');
let ctx = imageCanvas.getContext('2d');
let img = new Image();

function loadImage(event) {
    let reader = new FileReader();
    reader.onload = function(event) {
        img.src = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

img.onload = function() {
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

function decryptMessage() {
    let imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    let data = imageData.data;
    let binaryMessage = "";
    let message = "";

    for (let i = 0; i < data.length; i += 4) {
        binaryMessage += (data[i] & 1).toString();
        if (binaryMessage.length === 8) {
            let charCode = parseInt(binaryMessage, 2);
            if (charCode === 0) break;  // Detener al encontrar el terminador
            message += String.fromCharCode(charCode);
            binaryMessage = "";  // Reiniciar para el siguiente carácter
        }
    }

    document.getElementById('output').textContent = 'Mensaje desencriptado: ' + message;
}
