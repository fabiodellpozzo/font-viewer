import { getFonts } from './FontService.js';
import { FontCard } from './FontCard.js';

export function App() {
    const appContainer = document.createElement('div');
    appContainer.id = 'app';

    const fonts = getFonts();
    let index = 0;

    function renderNextBatch() {
        const batchSize = 10;
        for (let i = 0; i < batchSize && index < fonts.length; i++, index++) {
            const font = fonts[index];
            const fontCard = FontCard(font); // Gera o card da fonte
            appContainer.appendChild(fontCard);
        }
        if (index < fonts.length) {
            requestAnimationFrame(renderNextBatch);
        }
    }

    requestAnimationFrame(renderNextBatch);

    return appContainer;
}
