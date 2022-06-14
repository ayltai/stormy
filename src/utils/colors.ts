const extractColors = (rgb : string) => {
    const numbers = rgb.split(',');

    return [
        parseInt(numbers[0].substring(4), 10),
        parseInt(numbers[1], 10),
        parseInt(numbers[2], 10),
    ];
};

const toHex = (decimal : number) => {
    const hex = decimal.toString(16);

    return hex.length === 1 ? `0${hex}` : hex;
};

export const makeTransparent = (hexColorCode : string, opacity : number) => {
    if (hexColorCode.startsWith('rgb')) {
        const colors = extractColors(hexColorCode);

        return `#${toHex(colors[0])}${toHex(colors[1])}${toHex(colors[2])}${toHex(Math.round(255 * opacity))}`;
    }

    const hex = hexColorCode.replace('#', '');

    return `#${hex.substring(0, 2)}${hex.substring(2, 4)}${hex.substring(4, 6)}${toHex(Math.round(255 * opacity))}`;
};
