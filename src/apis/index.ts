import { SerializedError, } from '@reduxjs/toolkit';
import { QueryStatus, } from '@reduxjs/toolkit/query/react';

import { Place, Weather, } from '../models';

import { useGetAccuWeatherQuery, } from './accuweather';
import { useGetOneCallWeatherQuery, } from './openweathermap';

export { accuweatherApi, useGetCurrentConditionsQuery, useGetDailyConditionsQuery, useGetHourlyConditionsQuery, useGetLocationQuery, useGetAccuWeatherQuery, } from './accuweather';
export { autocompleteApi, geocodeApi, useGetAutocompleteQuery, useGetGeocodeQuery, } from './here';
export { openweathermapApi, useGetOneCallWeatherQuery, } from './openweathermap';
export { unsplashApi, useGetRandomPhotoQuery, } from './unsplash';

type Query = {
    [ key : string ] : (place : Place, options? : { pollingInterval? : number, }) => {
        data?  : Weather,
        error? : { status : number, data : unknown, } | { status : 'FETCH_ERROR', data? : undefined, error : string, } | { status : 'PARSING_ERROR', originalStatus : number, data : string, error : string, } | {status : 'CUSTOM_ERROR', data? : unknown, error : string, } | SerializedError | undefined,
        status : QueryStatus,
    },
};

const query : Query = {
    accuweather    : useGetAccuWeatherQuery,
    openweathermap : useGetOneCallWeatherQuery,
};

export const getWeatherQuery = (weatherProvider : 'accuweather' | 'openweathermap') => query[weatherProvider];
