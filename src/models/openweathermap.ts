type Precipitation = {
    '1h' : number,
};

type Weather = {
    id          : number,
    description : string,
};

type BaseWeather = {
    dt         : number,
    weather    : Weather[],
    temp       : number,
    humidity   : number,
    rain?      : Precipitation,
    snow?      : Precipitation,
    wind_speed : number,
    uvi        : number,
};

type HourlyWeather = BaseWeather & {
    pop : number,
};

type MinMax = {
    min : number,
    max : number,
};

type DailyWeather = Omit<HourlyWeather, 'temp' | 'rain' | 'snow'> & {
    temp  : MinMax,
    rain? : number,
    snow? : number,
};

export type OneCallWeather = {
    current : BaseWeather,
    hourly  : HourlyWeather[],
    daily   : DailyWeather[],
};
