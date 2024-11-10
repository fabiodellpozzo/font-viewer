let fonts = [];

export async function loadFonts() {
    try {
        const response = await fetch('get_fonts.php');
        fonts = await response.json();
        return fonts;
    } catch (error) {
        console.error('Error loading fonts:', error);
        return [];
    }
}

export function getFonts() {
    return fonts;
}

export function addFont(font) {
    const existingFont = fonts.find(f => f.family === font.family);
    if (existingFont) {
        font.variants.forEach(variant => {
            if (!existingFont.variants.includes(variant)) {
                existingFont.variants.push(variant);
                existingFont.files[variant] = font.files[variant];
            }
        });
        existingFont.sampleText = font.sampleText;
    } else {
        fonts.push(font);
    }
}

export function removeFont(fontFamily) {
    fonts = fonts.filter(f => f.family !== fontFamily);
}

export async function saveFonts() {
    try {
        await fetch('upload.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fonts)
        });
    } catch (error) {
        console.error('Error saving fonts:', error);
    }
}

