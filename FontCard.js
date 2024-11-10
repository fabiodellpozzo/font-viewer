import { generateEmbedCode } from './generateEmbedCode.js';
import { removeFont, saveFonts, loadFonts } from './FontService.js';

export function FontCard(font) {
    const fontCard = document.createElement('div');
    fontCard.className = 'card mb-3';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const h2 = document.createElement('h2');
    h2.textContent = font.family;
    h2.className = 'card-title';
    h2.style.fontFamily = font.family;

    const p1 = document.createElement('p');
    p1.textContent = `Variants: ${font.variants.join(', ')}`;
    p1.className = 'card-text';

    const exampleText = document.createElement('p');
    exampleText.className = 'font-text card-text';
    exampleText.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    exampleText.style.fontFamily = font.family;

    const sampleButton = document.createElement('button');
    sampleButton.className = 'btn btn-secondary';
    sampleButton.textContent = 'Sample';
    sampleButton.onclick = () => {
        const modal = document.getElementById('sampleModal');
        modal.style.display = 'block';

        const dynamicSampleText = document.getElementById('dynamicSampleText');
        dynamicSampleText.value = font.sampleText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

        const sampleTextContainer = document.getElementById('sampleTextContainer');
        sampleTextContainer.textContent = dynamicSampleText.value;
        sampleTextContainer.style.fontFamily = font.family;
        sampleTextContainer.style.fontSize = `${document.getElementById('fontSizeRange').value}px`;

        dynamicSampleText.addEventListener('input', () => {
            sampleTextContainer.textContent = dynamicSampleText.value;
        });

        const fontSizeRange = document.getElementById('fontSizeRange');
        const fontSizeValue = document.getElementById('fontSizeValue');
        fontSizeRange.addEventListener('input', (event) => {
            sampleTextContainer.style.fontSize = `${event.target.value}px`;
            fontSizeValue.textContent = `${event.target.value}px`;
        });

        // Limpar o embed code
        const embedCodeContent = document.getElementById('embedCodeContent');
        embedCodeContent.textContent = '';

        const generateEmbedCodeButton = document.getElementById('generateEmbedCode');
        generateEmbedCodeButton.addEventListener('click', () => {
            const embedCode = generateEmbedCode([font.family]);
            embedCodeContent.textContent = embedCode;
        });

        const copyEmbedCodeButton = document.getElementById('copyEmbedCode');
        copyEmbedCodeButton.addEventListener('click', () => {
            navigator.clipboard.writeText(embedCodeContent.textContent).then(() => {
                alert('Embed code copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy embed code: ', err);
            });
        });

        const span = document.getElementsByClassName('close')[0];
        span.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    };

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = async () => {
        removeFont(font.family);
        await saveFonts();
        fontCard.remove();
    };

    cardBody.appendChild(h2);
    cardBody.appendChild(p1);
    cardBody.appendChild(exampleText);
    cardBody.appendChild(sampleButton);
    cardBody.appendChild(deleteButton);
    fontCard.appendChild(cardBody);

    const fontFace = new FontFace(font.family, `url(${font.files[font.variants[0]]})`);
    document.fonts.add(fontFace);
    fontFace.load();

    return fontCard;
}


