import { loadFonts } from './FontService.js';
import { App } from './App.js';
import { initializeUploadForm } from './uploadFunctions.js';

document.addEventListener('DOMContentLoaded', async () => {
    await loadFonts(); // Carrega as fontes

    // Renderiza a aplicação
    const appContainer = document.getElementById('app');
    const app = App();
    appContainer.innerHTML = '';
    appContainer.appendChild(app);

    // Inicializa o formulário de upload
    initializeUploadForm();

    // Adiciona o evento de clique para o botão Refresh Page
    const refreshButton = document.getElementById('refreshPage');
    refreshButton.addEventListener('click', () => {
        window.location.reload();
    });
});
