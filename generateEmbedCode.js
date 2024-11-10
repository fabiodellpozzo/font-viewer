import { getFonts } from './FontService.js';

export function generateEmbedCode(selectedFonts) {
    let embedCode = '';
    selectedFonts.forEach(font => {
        const fontData = getFonts().find(f => f.family === font);
        if (fontData) {
            Object.values(fontData.files).forEach(file => {
                embedCode += `<link href="http://localhost:8000/${file}" rel="stylesheet">\n`;
            });
            embedCode += `<style>
  body {
        font-family: '${fontData.family}', sans-serif;
    }
</style>\n`;
        }
    });
    return embedCode;
}
