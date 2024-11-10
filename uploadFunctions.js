import { addFont, saveFonts } from './FontService.js';
import { App } from './App.js';

export function initializeUploadForm() {
    const form = document.getElementById('uploadForm');
    form.addEventListener('submit', handleUpload);
}

async function handleUpload(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('upload.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        if (data.status === 'success') {
            const newFont = {
                family: data.fontFamily,
                variants: [data.fontVariant],
                files: {
                    [data.fontVariant]: data.fileUrl
                },
                sampleText: formData.get('sampleText') || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            };

            addFont(newFont);
            await saveFonts();

            // Atualiza a lista de fontes
            const appContainer = document.getElementById('app');
            appContainer.innerHTML = ''; // Limpa os cartões existentes antes de renderizar novos
            const app = App();
            appContainer.appendChild(app);
        } else {
            console.error('Error uploading font:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
