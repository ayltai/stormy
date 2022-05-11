import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import { OneCallWeather, Place, Weather, } from '../models';

export const openweathermapApi = createApi({
    reducerPath : 'openweathermapApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'https://api.openweathermap.org/data/2.5',
    }),
    endpoints   : build => ({
        getOneCallWeather : build.query<Weather, Place>({
            query             : place => `/onecall?lat=${place.latitude || 0}&lon=${place.longitude || 0}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY_OPENWEATHERMAP || ''}`,
            transformResponse : (response : OneCallWeather) => ({
                current : {
                    summary         : response.current.weather[0].description,
                    icon            : response.current.weather[0].id,
                    temperature     : response.current.temp,
                    humidity        : response.current.humidity,
                    precipIntensity : (response.current.rain ? response.current.rain['1h'] || 0 : 0) + (response.current.snow ? response.current.snow['1h'] || 0 : 0),
                    windSpeed       : response.current.wind_speed,
                    uvIndex         : response.current.uvi,
                },
                hourly  : response.hourly.slice(1).map(hour => ({
                    time              : hour.dt * 1000,
                    summary           : hour.weather[0].description,
                    icon              : hour.weather[0].id,
                    temperature       : hour.temp,
                    humidity          : hour.humidity,
                    precipProbability : hour.pop * 100,
                    precipIntensity   : (hour.rain ? hour.rain['1h'] || 0 : 0) + (hour.snow ? hour.snow['1h'] || 0 : 0),
                    windSpeed         : hour.wind_speed,
                    uvIndex           : hour.uvi,
                })),
                daily   : response.daily.slice(1).map(day => ({
                    time              : day.dt * 1000,
                    summary           : day.weather[0].description,
                    icon              : day.weather[0].id,
                    temperatureHigh   : day.temp.max,
                    temperatureLow    : day.temp.min,
                    humidity          : day.humidity,
                    precipProbability : day.pop * 100,
                    precipIntensity   : (day.rain || 0) + (day.snow || 0),
                    windSpeed         : day.wind_speed,
                    uvIndex           : day.uvi,
                })),
            }),
        }),
    }),
});

export const { useGetOneCallWeatherQuery, } = openweathermapApi;
