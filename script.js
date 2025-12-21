document.getElementById('addLogoBtn').addEventListener('click', () => {
    document.getElementById('logoUpload').click();
});

document.getElementById('logoUpload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.classList.add('layer');
            imgElement.style.left = '50px';
            imgElement.style.top = '50px';
            imgElement.style.transform = 'rotate(0deg)';
            document.getElementById('map').appendChild(imgElement);

            imgElement.addEventListener('mousedown', (e) => {
                let offsetX = e.clientX - imgElement.offsetLeft;
                let offsetY = e.clientY - imgElement.offsetTop;
                
                function moveAt(e) {
                    imgElement.style.left = e.clientX - offsetX + 'px';
                    imgElement.style.top = e.clientY - offsetY + 'px';
                }

                document.addEventListener('mousemove', moveAt);

                imgElement.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', moveAt);
                });
            });
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('addTextBtn').addEventListener('click', () => {
    const textInput = document.getElementById('textInput');
    textInput.style.display = 'block';
    textInput.focus();
});

document.getElementById('textInput').addEventListener('blur', () => {
    const text = document.getElementById('textInput').value;
    const textElement = document.createElement('div');
    textElement.classList.add('layer');
    textElement.textContent = text;
    textElement.style.left = '100px';
    textElement.style.top = '100px';
    textElement.style.fontSize = '20px';
    textElement.style.transform = 'rotate(0deg)';
    document.getElementById('map').appendChild(textElement);

    document.getElementById('textInput').style.display = 'none';
    document.getElementById('textControls').style.display = 'block';

    textElement.addEventListener('mousedown', (e) => {
        let offsetX = e.clientX - textElement.offsetLeft;
        let offsetY = e.clientY - textElement.offsetTop;

        function moveAt(e) {
            textElement.style.left = e.clientX - offsetX + 'px';
            textElement.style.top = e.clientY - offsetY + 'px';
        }

        document.addEventListener('mousemove', moveAt);

        textElement.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', moveAt);
        });
    });
});

document.getElementById('rotateTextBtn').addEventListener('click', () => {
    const textElements = document.querySelectorAll('.layer');
    textElements.forEach(textElement => {
        const currentRotation = parseInt(textElement.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
        textElement.style.transform = `rotate(${currentRotation + 15}deg)`;
    });
});

document.getElementById('resizeTextBtn').addEventListener('click', () => {
    const textElements = document.querySelectorAll('.layer');
    textElements.forEach(textElement => {
        let currentSize = parseInt(window.getComputedStyle(textElement).fontSize);
        textElement.style.fontSize = (currentSize + 5) + 'px';
    });
});

document.getElementById('toggleGridBtn').addEventListener('click', () => {
    const grid = document.querySelector('.grid');
    if (grid) {
        grid.remove();
    } else {
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('grid');
        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.style.position = 'absolute';
            line.style.top = `${i * 50}px`;
            line.style.left = '0';
            line.style.width = '100%';
            line.style.height = '1px';
            line.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            gridDiv.appendChild(line);
        }
        document.getElementById('map').appendChild(gridDiv);
    }
});

document.getElementById('exportBtn').addEventListener('click', () => {
    const map = document.getElementById('map');
    const html = map.innerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'map_with_layers.html';
    link.click();
});
