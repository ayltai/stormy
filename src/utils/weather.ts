export const getAlphaForPrecipIntensity = (intensity : number) => intensity === 0 ? 0 : intensity <= 1 ? 0.25 : intensity <= 2 ? 0.5 : intensity <= 4 ? 0.75 : 1;
