import { createTheme, ThemeProvider, } from '@mui/material';
import React, { useCallback, useEffect, useState, } from 'react';
import { Provider, } from 'react-redux';
import { HashRouter, Route, Routes, } from 'react-router-dom';
import { PersistGate, } from 'redux-persist/integration/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useAppSelector, } from './hooks';
import { persistor, store, } from './redux';
import { Home, Locations, Settings, } from './screens';
import { palette, } from './styles';
import { changeDarkMode, } from './utils';
import './css/weather-icons.css';

const AppRoot = () => {
    const darkMode = useAppSelector(state => state.settings.darkMode);

    const createAppTheme = useCallback(() => createTheme({
        palette : {
            ...palette,
            mode : darkMode ? 'dark' : 'light',
        },
    }), [ darkMode, ]);

    const [ theme, setTheme, ] = useState(createAppTheme());

    useEffect(() => {
        changeDarkMode(darkMode);

        setTheme(createAppTheme());
    }, [ darkMode, ]);

    return (
        <ThemeProvider theme={theme}>
            <HashRouter>
                <Routes>
                    <Route
                        path='/'
                        element={<Home />} />
                    <Route
                        path='/settings'
                        element={<Settings />} />
                    <Route
                        path='/settings/locations'
                        element={<Locations />} />
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
};

export const App = () => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <AppRoot />
        </PersistGate>
    </Provider>
);
