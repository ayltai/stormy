import { SerializedError, } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery, FetchBaseQueryError, QueryStatus, } from '@reduxjs/toolkit/query/react';
import { useEffect, useState, } from 'react';

import { CurrentConditions, CurrentWeather, DailyConditions, DailyWeather, HourlyConditions, HourlyWeather, Location, Place, Weather, } from '../models';

export const accuweatherApi = createApi({
    reducerPath : 'accuweatherApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'http://dataservice.accuweather.com',
    }),
    endpoints   : build => ({
        getLocation          : build.query<Location, Place>({
            query : place => `/locations/v1/cities/geoposition/search?q=${place.latitude || 0},${place.longitude || 0}&apikey=${process.env.REACT_APP_API_KEY_ACCUWEATHER || ''}`,
        }),
        getCurrentConditions : build.query<CurrentWeather, string>({
            query             : locationKey => `/currentconditions/v1/${ locationKey }?apikey=${process.env.REACT_APP_API_KEY_ACCUWEATHER || ''}`,
            transformResponse : (response : CurrentConditions[]) => ({
                summary         : response[0].WeatherText,
                icon            : response[0].WeatherIcon,
                temperature     : response[0].Temperature.Metric.Value,
                humidity        : response[0].RelativeHumidity,
                precipIntensity : response[0].Precip1hr.Metric.Value,
                windSpeed       : response[0].Wind.Speed.Metric.Value,
                uvIndex         : response[0].UVIndex,
            }),
        }),
        getHourlyConditions  : build.query<HourlyWeather[], string>({
            query             : locationKey => `/forecasts/v1/hourly/12hour/${ locationKey }?apikey=${process.env.REACT_APP_API_KEY_ACCUWEATHER || ''}`,
            transformResponse : (response : HourlyConditions[]) => response.map(hour => ({
                time              : hour.EpochTime * 1000,
                icon              : hour.WeatherIcon,
                temperature       : hour.Temperature.Value,
                humidity          : hour.RelativeHumidity,
                precipProbability : hour.PrecipitationProbability,
                precipIntensity   : hour.TotalLiquid.Value,
                windSpeed         : hour.Wind.Speed.Value,
                uvIndex           : hour.UVIndex,
            })),
        }),
        getDailyConditions   : build.query<DailyWeather[], string>({
            query             : locationKey => `/forecasts/v1/daily/5day/${ locationKey }?apikey=${process.env.REACT_APP_API_KEY_ACCUWEATHER || ''}`,
            transformResponse : (response : DailyConditions[]) => response.map(day => ({
                time              : day.EpochDate * 1000,
                summary           : day.Headline.Text,
                icon              : day.Day.Icon,
                temperatureHigh   : day.Temperature.Maximum.Value,
                temperatureLow    : day.Temperature.Minimum.Value,
                precipProbability : day.Day.PrecipitationProbability,
                precipIntensity   : day.Day.TotalLiquid.Value,
                windSpeed         : day.Day.Wind.Speed.Value,
                uvIndex           : day.AirAndPollen.find(nameValue => nameValue.Name === 'UVIndex')?.Value,
            })),
        }),
    }),
});

export const { useGetCurrentConditionsQuery, useGetDailyConditionsQuery, useGetHourlyConditionsQuery, useGetLocationQuery, } = accuweatherApi;

export const useGetAccuWeatherQuery = (geolocation : Place, options? : { pollingInterval? : number, }) => {
    const {
        data      : location,
        isSuccess : isLocationQuerySucceeded,
        status    : locationQueryStatus,
        error     : locationError,
    } = useGetLocationQuery(geolocation, options);

    const {
        data   : currentWeather,
        status : currentConditionsQueryStatus,
        error  : currentConditionsQueryError,
    } = useGetCurrentConditionsQuery(location!.Key, {
        ...options,
        skip : !isLocationQuerySucceeded,
    });

    const {
        data   : hourlyWeather,
        status : hourlyConditionsQueryStatus,
        error  : hourlyConditionsQueryError,
    } = useGetHourlyConditionsQuery(location!.Key, {
        ...options,
        skip : !isLocationQuerySucceeded,
    });

    const {
        data   : dailyWeather,
        status : dailyConditionsQueryStatus,
        error  : dailyConditionsQueryError,
    } = useGetDailyConditionsQuery(location!.Key, {
        ...options,
        skip : !isLocationQuerySucceeded,
    });

    const [ data,   setData,   ] = useState<Weather | undefined>();
    const [ error,  setError,  ] = useState<FetchBaseQueryError | SerializedError | undefined>();
    const [ status, setStatus, ] = useState<QueryStatus>(QueryStatus.uninitialized);

    useEffect(() => {
        setError(dailyConditionsQueryError || hourlyConditionsQueryError || currentConditionsQueryError || locationError);
    }, [ locationError, currentConditionsQueryError, hourlyConditionsQueryError, dailyConditionsQueryError, ]);

    useEffect(() => {
        const statuses = [
            locationQueryStatus,
            currentConditionsQueryStatus,
            hourlyConditionsQueryStatus,
            dailyConditionsQueryStatus,
        ];

        if (statuses.every(s => s === QueryStatus.uninitialized)) {
            setStatus(QueryStatus.uninitialized);
        } else if (statuses.every(s => s === QueryStatus.fulfilled)) {
            setStatus(QueryStatus.fulfilled);
        } else if (statuses.some(s => s === QueryStatus.rejected)) {
            setStatus(QueryStatus.rejected);
        } else {
            setStatus(QueryStatus.pending);
        }
    }, [ locationQueryStatus, currentConditionsQueryStatus, hourlyConditionsQueryStatus, dailyConditionsQueryStatus, ]);

    useEffect(() => {
        setData(currentWeather && hourlyWeather && dailyWeather ? ({
            current : currentWeather,
            hourly  : hourlyWeather,
            daily   : dailyWeather,
        }) : undefined);
    }, [ currentWeather, hourlyWeather, dailyWeather, ]);

    return { data, error, status, };
};
