export const convertTemperature = ({
    temperature,
    unit           = 'metric',
    displayUnit    = false,
    fractionDigits = 1,
} : {
    temperature     : number,
    unit?           : 'metric' | 'imperial',
    displayUnit?    : boolean,
    fractionDigits? : number,
}) => {
    const convertedTemperature = unit === 'metric' ? temperature : (temperature * 9 / 5) + 32;

    return displayUnit ? `${(fractionDigits === 0 ? Math.round(convertedTemperature) : convertedTemperature).toFixed(fractionDigits)}°${unit === 'metric' ? 'C' : 'F'}` : convertedTemperature;
};

export const convertSpeed = ({
    value,
    unit           = 'metric',
    displayUnit    = false,
    fractionDigits = 1,
} : {
    value           : number,
    unit?           : 'metric' | 'imperial',
    displayUnit?    : boolean,
    fractionDigits? : number,
}) => {
    const convertedSpeed = unit === 'metric' ? value : value * 2.23693629;

    return displayUnit ? `${(fractionDigits === 0 ? Math.round(convertedSpeed) : convertedSpeed).toFixed(fractionDigits)}${unit === 'metric' ? 'km/h' : 'mph'}` : convertedSpeed;
};
