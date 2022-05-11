export type CurrentWeather = {
    summary            : string,
    icon               : number,
    temperature        : number,
    humidity           : number,
    precipProbability? : number,
    precipIntensity    : number,
    windSpeed          : number,
    uvIndex            : number,
};

export type HourlyWeather = {
    time              : number,
    summary?          : string,
    icon              : number,
    temperature       : number,
    humidity          : number,
    precipProbability : number,
    precipIntensity   : number,
    windSpeed         : number,
    uvIndex           : number,
};

export type DailyWeather = {
    time              : number,
    summary           : string,
    icon              : number,
    temperatureHigh   : number,
    temperatureLow    : number,
    precipProbability : number,
    precipIntensity   : number,
    windSpeed         : number,
    uvIndex?          : number,
};

export type Weather = {
    current : CurrentWeather,
    hourly  : HourlyWeather[],
    daily   : DailyWeather[],
};
