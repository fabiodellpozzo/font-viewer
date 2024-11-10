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

            const sampleTextInput = document.getElementById('sampleText');
            sampleTextInput.value = font.sampleText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

            const variantsContainer = document.getElementById('variantsContainer');
            font.variants.forEach(variant => {
                const variantDiv = document.createElement('div');
                variantDiv.className = 'font-variant';
                variantDiv.style.fontFamily = font.family;
                variantDiv.textContent = sampleTextInput.value;
                variantsContainer.appendChild(variantDiv);

                // Carrega a fonte dinamicamente para garantir que ela seja aplicada corretamente
                const fontFace = new FontFace(font.family, `url(${font.files[variant]})`);
                document.fonts.add(fontFace);
                fontFace.load();
            });

            // Atualizar visualização de estilo dinamicamente
            sampleTextInput.addEventListener('input', () => {
                const sampleText = sampleTextInput.value;
                variantsContainer.childNodes.forEach(child => {
                    child.textContent = sampleText;
                });
            });

            const generateEmbedCodeButton = document.getElementById('generateEmbedCode');
            generateEmbedCodeButton.addEventListener('click', () => {
                const embedCode = generateEmbedCode([font.family]);
                const embedCodeContent = document.getElementById('embedCodeContent');
                embedCodeContent.textContent = embedCode;
            });

        } else {
            console.error('Font not found:', fontFamily);
        }
    } else {
        console.error('No font family specified in URL');
    }
});

