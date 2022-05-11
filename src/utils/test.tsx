import { createTheme, ThemeProvider, } from '@mui/material';
import { configureStore, PreloadedState, Store, } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import { render, } from '@testing-library/react';
import React, { ReactNode, } from 'react';
import { HashRouter, } from 'react-router-dom';
import { Provider, } from 'react-redux';

import { BACKGROUND_BLUR, BACKGROUND_DARKEN, } from '../Constants';
import { Place, } from '../models';
import { settingsReducer, } from '../redux';
import { palette, } from '../styles';

export const DEFAULT_LOCATION : Place = {
    name      : 'Hong Kong International Airport, Sky Plaza Road, Chek Lap Kok',
    latitude  : 22.3080,
    longitude : 113.9185,
};

export const MOCK_WEATHER_RESPONSE = {
    'lat'             : 39.31,
    'lon'             : -74.5,
    'timezone'        : 'America/New_York',
    'timezone_offset' : -18000,
    'current'         : {
        'dt'         : 1646318698,
        'sunrise'    : 1646306882,
        'sunset'     : 1646347929,
        'temp'       : 282.21,
        'feels_like' : 278.41,
        'pressure'   : 1014,
        'humidity'   : 65,
        'dew_point'  : 275.99,
        'uvi'        : 2.55,
        'clouds'     : 40,
        'visibility' : 10000,
        'wind_speed' : 8.75,
        'wind_deg'   : 360,
        'wind_gust'  : 13.89,
        'weather'    : [
            {
                'id'          : 802,
                'main'        : 'Clouds',
                'description' : 'scattered clouds',
                'icon'        : '03d',
            },
        ],
    },
    'hourly'          : [
        {
            'dt'         : 1646316000,
            'temp'       : 281.94,
            'feels_like' : 278.49,
            'pressure'   : 1014,
            'humidity'   : 67,
            'dew_point'  : 276.16,
            'uvi'        : 1.49,
            'clouds'     : 52,
            'visibility' : 10000,
            'wind_speed' : 7.16,
            'wind_deg'   : 313,
            'wind_gust'  : 10.71,
            'weather'    : [
                {
                    'id'          : 803,
                    'main'        : 'Clouds',
                    'description' : 'broken clouds',
                    'icon'        : '04d',
                },
            ],
            'pop'        : 0.03,
        },
        {
            'dt'         : 1646316000,
            'temp'       : 281.94,
            'feels_like' : 278.49,
            'pressure'   : 1014,
            'humidity'   : 67,
            'dew_point'  : 276.16,
            'uvi'        : 1.49,
            'clouds'     : 52,
            'visibility' : 10000,
            'wind_speed' : 7.16,
            'wind_deg'   : 313,
            'wind_gust'  : 10.71,
            'weather'    : [
                {
                    'id'          : 803,
                    'main'        : 'Clouds',
                    'description' : 'broken clouds',
                    'icon'        : '04d',
                },
            ],
            'pop'        : 0.03,
        },
    ],
    'daily'           : [
        {
            'dt'         : 1646326800,
            'sunrise'    : 1646306882,
            'sunset'     : 1646347929,
            'moonrise'   : 1646309880,
            'moonset'    : 1646352120,
            'moon_phase' : 0.03,
            'temp'       : {
                'day'   : 281.63,
                'min'   : 271.72,
                'max'   : 282.21,
                'night' : 271.72,
                'eve'   : 277.99,
                'morn'  : 280.92,
            },
            'feels_like' : {
                'day'   : 277.83,
                'night' : 264.72,
                'eve'   : 273.35,
                'morn'  : 277.66,
            },
            'pressure'   : 1016,
            'humidity'   : 55,
            'dew_point'  : 273.12,
            'wind_speed' : 9.29,
            'wind_deg'   : 3,
            'wind_gust'  : 16.48,
            'weather'    : [
                {
                    'id'          : 500,
                    'main'        : 'Rain',
                    'description' : 'light rain',
                    'icon'        : '10d',
                },
            ],
            'clouds'     : 49,
            'pop'        : 0.25,
            'rain'       : 0.11,
            'uvi'        : 3.38,
        },
        {
            'dt'         : 1646326800,
            'sunrise'    : 1646306882,
            'sunset'     : 1646347929,
            'moonrise'   : 1646309880,
            'moonset'    : 1646352120,
            'moon_phase' : 0.03,
            'temp'       : {
                'day'   : 281.63,
                'min'   : 271.72,
                'max'   : 282.21,
                'night' : 271.72,
                'eve'   : 277.99,
                'morn'  : 280.92,
            },
            'feels_like' : {
                'day'   : 277.83,
                'night' : 264.72,
                'eve'   : 273.35,
                'morn'  : 277.66,
            },
            'pressure'   : 1016,
            'humidity'   : 55,
            'dew_point'  : 273.12,
            'wind_speed' : 9.29,
            'wind_deg'   : 3,
            'wind_gust'  : 16.48,
            'weather'    : [
                {
                    'id'          : 500,
                    'main'        : 'Rain',
                    'description' : 'light rain',
                    'icon'        : '10d',
                },
            ],
            'clouds'     : 49,
            'pop'        : 0.25,
            'rain'       : 0.11,
            'uvi'        : 3.38,
        },
    ],
};

const createStore = (preloadedState? : Record<string, any>) => configureStore({
    reducer : {
        settings : settingsReducer,
    },
    preloadedState,
});

const defaultStore = createStore();

type RootState = ReturnType<typeof defaultStore.getState>;

export const defaultState : RootState = {
    settings : {
        language         : 'en',
        darkMode         : false,
        autoLaunch       : false,
        refreshInterval  : 5 * 60 * 1000,
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
    },
};

const customRender = (ui : any, {
    preloadedState,
    store = createStore(preloadedState),
    ...rest
} : {
    preloadedState?   : PreloadedState<RootState>,
    store?            : Store<RootState>,
    [ rest : string ] : any,
} = {}) => render(ui, {
    wrapper : ({
        children,
    } : {
        children : ReactNode,
    }) => {
        const theme = createTheme({
            palette : {
                ...palette,
                mode : 'light',
            },
        });

        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <HashRouter>
                        {children}
                    </HashRouter>
                </ThemeProvider>
            </Provider>
        );
    },
    ...rest,
});

export * from '@testing-library/react';

export { customRender as render, };
