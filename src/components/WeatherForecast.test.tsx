import fetchMock from 'jest-fetch-mock';
import React from 'react';

import { openweathermapApi, } from '../apis';
import { setForecastDays, store, } from '../redux';
import { act, DEFAULT_LOCATION, MOCK_WEATHER_RESPONSE, render, } from '../utils/test';

import { WeatherForecast, } from './WeatherForecast';

describe('<WeatherForecast />', () => {
    it('renders correctly', async () => {
        const { getByText, } = render(<WeatherForecast />, {
            store,
        });

        await act(async () => {
            store.dispatch(setForecastDays(1));

            fetchMock.mockResponseOnce(JSON.stringify(MOCK_WEATHER_RESPONSE));
            await store.dispatch(openweathermapApi.endpoints.getOneCallWeather.initiate(DEFAULT_LOCATION));
        });

        expect(getByText('272unit_metric_temperature')).toBeInTheDocument();
        expect(getByText('282unit_metric_temperature')).toBeInTheDocument();
    });
});
