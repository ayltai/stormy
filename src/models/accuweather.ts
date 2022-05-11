export type Location = {
    Key : string,
};

type Metric = {
    Metric : {
        Value : number,
    },
};

type Wind = {
    Speed : Value,
};

type WindMetric = {
    Speed : Metric,
};

type BaseConditions = {
    EpochTime        : number,
    WeatherIcon      : number,
    Temperature      : Value,
    RelativeHumidity : number,
    Wind             : Wind,
    UVIndex          : number,
};

export type CurrentConditions = Omit<BaseConditions, 'Temperature' | 'Wind'> & {
    WeatherText : string,
    Temperature : Metric,
    Precip1hr   : Metric,
    Wind        : WindMetric,
};

export type HourlyConditions = BaseConditions & {
    PrecipitationProbability : number,
    TotalLiquid              : Value,
};

type Value = {
    Value : number,
};

type MinMax = {
    Minimum : Value,
    Maximum : Value,
};

type DayConditions = HourlyConditions & {
    Icon : number,
    Wind : Wind,
};

type Headline = {
    Text : string,
};

type NameValue = {
    Name  : string,
    Value : number,
};

export type DailyConditions = {
    EpochDate    : number,
    Headline     : Headline,
    Temperature  : MinMax,
    Day          : DayConditions,
    AirAndPollen : NameValue[],
};
