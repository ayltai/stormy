import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import i18next from 'i18next';

import { BACKGROUND_BLUR, BACKGROUND_DARKEN, REFRESH_INTERVAL, } from '../Constants';
import { LocationProvider, Place, TimeFormat, Unit, WeatherProvider, } from '../models';
import { getLocale, handleError, isDarkMode, setAppAutoLaunch, } from '../utils';

const DEFAULT_LOCATION : Place = {
    name      : 'Hong Kong International Airport, Sky Plaza Road, Chek Lap Kok',
    latitude  : 22.3080,
    longitude : 113.9185,
};

type SettingsState = {
    language         : string,
    darkMode         : boolean,
    autoLaunch       : boolean,
    refreshInterval  : number,
    unit             : Unit,
    timeFormat       : TimeFormat,
    locationProvider : LocationProvider,
    weatherProvider  : WeatherProvider,
    forecastDays     : number,
    forecastHours    : number,
    forecastType     : 'humidity' | 'windSpeed' | 'uvIndex',
    places           : Place[],
    selectedPlace?   : Place,
    backdropDarken   : number,
    backdropBlur     : number,
};

const initialState : SettingsState = {
    language         : getLocale().substring(0, 2),
    darkMode         : isDarkMode() || window.matchMedia('(prefers-color-scheme : dark)').matches,
    autoLaunch       : false,
    refreshInterval  : REFRESH_INTERVAL,
    timeFormat       : '12h',
    unit             : 'metric',
    locationProvider : 'here',
    weatherProvider  : 'openweathermap',
    forecastDays     : 4,
    forecastHours    : 8,
    forecastType     : 'humidity',
    places           : [ DEFAULT_LOCATION, ],
    selectedPlace    : DEFAULT_LOCATION,
    backdropDarken   : BACKGROUND_DARKEN,
    backdropBlur     : BACKGROUND_BLUR,
};

const settingsSlice = createSlice({
    initialState,
    name     : 'settings',
    reducers : {
        setLanguage : (state, action: PayloadAction<string>) => {
            state.language = action.payload;

            i18next.changeLanguage(action.payload).catch(handleError);
        },
        setDarkMode : (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
        setAutoLaunch : (state, action: PayloadAction<boolean>) => {
            state.autoLaunch = action.payload;

            setAppAutoLaunch(action.payload);
        },
        setRefreshInterval : (state, action: PayloadAction<number>) => {
            state.refreshInterval = action.payload;
        },
        setTimeFormat : (state, action: PayloadAction<TimeFormat>) => {
            state.timeFormat = action.payload;
        },
        setUnit : (state, action: PayloadAction<Unit>) => {
            state.unit = action.payload;
        },
        setLocationProvider : (state, action: PayloadAction<LocationProvider>) => {
            state.locationProvider = action.payload;
        },
        setWeatherProvider : (state, action: PayloadAction<WeatherProvider>) => {
            state.weatherProvider = action.payload;
        },
        setForecastDays : (state, action: PayloadAction<number>) => {
            state.forecastDays = action.payload;
        },
        setForecastHours : (state, action: PayloadAction<number>) => {
            state.forecastHours = action.payload;
        },
        setForecastType : (state, action: PayloadAction<'humidity' | 'windSpeed' | 'uvIndex'>) => {
            state.forecastType = action.payload;
        },
        setPlaces : (state, action: PayloadAction<Place[]>) => {
            state.places = action.payload;
        },
        setSelectedPlace : (state, action: PayloadAction<Place>) => {
            state.selectedPlace = action.payload;
        },
        setBackdropDarken : (state, action: PayloadAction<number>) => {
            state.backdropDarken = action.payload;
        },
        setBackdropBlur : (state, action: PayloadAction<number>) => {
            state.backdropBlur = action.payload;
        },
    },
});

export const { setAutoLaunch, setBackdropBlur, setBackdropDarken, setDarkMode, setForecastDays, setForecastHours, setForecastType, setLanguage, setPlaces, setRefreshInterval, setSelectedPlace, setTimeFormat, setUnit, setWeatherProvider, } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
