import { getFonts } from './FontService.js';
import { generateEmbedCode } from './generateEmbedCode.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const fontFamily = params.get('family');

    if (fontFamily) {
        const fonts = getFonts();
        const font = fonts.find(f => f.family === fontFamily);

        if (font) {
            const fontName = document.getElementById('fontName');
            fontName.textContent = font.family;

            const variantsContainer = document.getElementById('variantsContainer');
            font.variants.forEach(variant => {
                const variantDiv = document.createElement('div');
                variantDiv.className = 'font-variant';
                variantDiv.style.fontFamily = font.family;
                variantDiv.textContent = `Variant: ${variant} - The quick brown fox jumps over the lazy dog.`;
                variantsContainer.appendChild(variantDiv);

                // Carrega a fonte dinamicamente para garantir que ela seja aplicada corretamente
                const fontFace = new FontFace(font.family, `url(${font.files[variant]})`);
                document.fonts.add(fontFace);
                fontFace.load();
            });

            // Atualizar visualização de estilo
            const stylePreview = document.getElementById('stylePreview');
            stylePreview.style.fontFamily = font.family;

            // Gerar e exibir o código embed automaticamente
            const embedCode = generateEmbedCode([font.family]);
            const iframe = document.getElementById('embedCodeIframe');
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(`<html><body>${embedCode}</body></html>`);
            doc.close();
        } else {
            console.error('Font not found:', fontFamily);
        }
    } else {
        console.error('No font family specified in URL');
    }
});
