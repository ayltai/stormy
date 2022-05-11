import { combineReducers, configureStore, } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { accuweatherApi, autocompleteApi, geocodeApi, openweathermapApi, unsplashApi, } from '../apis';
import { settingsReducer, } from './settingsSlice';

export const store = configureStore({
    reducer : persistReducer({
        key       : 'root',
        blacklist : [
            accuweatherApi.reducerPath,
            autocompleteApi.reducerPath,
            geocodeApi.reducerPath,
            openweathermapApi.reducerPath,
            unsplashApi.reducerPath,
        ],
        storage,
    }, combineReducers({
        [ accuweatherApi.reducerPath    ] : accuweatherApi.reducer,
        [ autocompleteApi.reducerPath   ] : autocompleteApi.reducer,
        [ geocodeApi.reducerPath        ] : geocodeApi.reducer,
        [ openweathermapApi.reducerPath ] : openweathermapApi.reducer,
        [ unsplashApi.reducerPath       ] : unsplashApi.reducer,
        settings                          : settingsReducer,
    })),
    middleware : getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck : {
            ignoredActions : [
                FLUSH,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER,
                REHYDRATE,
            ],
        },
    }).concat(accuweatherApi.middleware, autocompleteApi.middleware, geocodeApi.middleware, openweathermapApi.middleware, unsplashApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { settingsReducer, setAutoLaunch, setBackdropBlur, setBackdropDarken, setDarkMode, setForecastDays, setForecastHours, setForecastType, setLanguage, setPlaces, setRefreshInterval, setSelectedPlace, setTimeFormat, setUnit, setWeatherProvider, } from './settingsSlice';
