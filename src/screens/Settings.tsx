import { List, } from '@mui/material';
import React from 'react';
import { useTranslation, } from 'react-i18next';
import { useNavigate, } from 'react-router-dom';

import { BACKGROUND_BLUR, BACKGROUND_DARKEN, } from '../Constants';
import { Preference, PreferenceSubheader, SelectPreference, SwitchPreference, } from '../components/preferences';
import { useAppDispatch, useAppSelector, } from '../hooks';
import { setAutoLaunch, setBackdropBlur, setBackdropDarken, setDarkMode, setForecastDays, setForecastHours, setForecastType, setRefreshInterval, setTimeFormat, setUnit, setWeatherProvider, } from '../redux';
import { exit, openUrl, } from '../utils';

import { Screen, } from './Screen';

export const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { t, } = useTranslation();

    const { autoLaunch, backdropBlur, backdropDarken, darkMode, forecastDays, forecastHours, forecastType, refreshInterval, selectedPlace, timeFormat, unit, weatherProvider, } = useAppSelector(state => state.settings);

    const handleLocationClick = () => navigate('/settings/locations');

    const handleRefreshIntervalChange = (value : number) => dispatch(setRefreshInterval(value * 60 * 1000));

    const handleForecastDaysChange = (value : number) => dispatch(setForecastDays(value));

    const handleForecastHoursChange = (value : number) => dispatch(setForecastHours(value));

    const handleForecastTypeChange = (value : string) => dispatch(setForecastType(value === t('pref_forecast_type_humidity') ? 'humidity' : t('pref_forecast_type_wind_speed') ? 'windSpeed' : 'uvIndex'));

    const handleWeatherProviderChange = (value : string) => dispatch(setWeatherProvider(value === 'OpenWeatherMap' ? 'openweathermap' : 'accuweather'));

    const handleAutoLaunchChange = (value : boolean) => dispatch(setAutoLaunch(value));

    const handleUnitChange = (value : string) => dispatch(setUnit(value === t('pref_unit_imperial') ? 'imperial' : 'metric'));

    const handleTimeFormatChange = (value : string) => dispatch(setTimeFormat(value === t('pref_time_format_12') ? '12h' : '24h'));

    const handleBlurBackgroundChange = (value : boolean) => dispatch(setBackdropBlur(value ? BACKGROUND_BLUR : 0));

    const handleDarkenBackgroundChange = (value : boolean) => dispatch(setBackdropDarken(value ? BACKGROUND_DARKEN : 0));

    const handleDarkModeChange = (value : boolean) => dispatch(setDarkMode(value));

    const handleDocumentation = () => openUrl('https://github.com/ayltai/stormy/');

    const handleReportIssue = () => openUrl('https://github.com/ayltai/stormy/issues/new');

    const handleExit = () => exit();

    return (
        <Screen title={t('settings')}>
            <List role='list'>
                <PreferenceSubheader title={t('pref_title_general')} />
                <Preference
                    title={t('pref_location')}
                    description={selectedPlace.name}
                    onClick={handleLocationClick} />
                <SelectPreference
                    title={t('pref_refresh_interval')}
                    description={t('pref_refresh_interval_desc', {
                        refreshInterval : refreshInterval / 60 / 1000,
                    })}
                    data={[
                        15,
                        30,
                        60,
                    ]}
                    value={refreshInterval / 60 / 1000}
                    onSelect={handleRefreshIntervalChange} />
                <SelectPreference
                    title={t('pref_forecast_days')}
                    description={t('pref_forecast_days_desc', {
                        forecastDays,
                    })}
                    data={[
                        3,
                        4,
                        5,
                    ]}
                    value={forecastDays}
                    onSelect={handleForecastDaysChange} />
                <SelectPreference
                    title={t('pref_forecast_hours')}
                    description={t('pref_forecast_hours_desc', {
                        forecastHours,
                    })}
                    data={[
                        4,
                        6,
                        8,
                        12,
                    ]}
                    value={forecastHours}
                    onSelect={handleForecastHoursChange} />
                <SelectPreference
                    title={t('pref_forecast_type')}
                    description={t(forecastType === 'humidity' ? 'pref_forecast_type_humidity' : forecastType === 'windSpeed' ? 'pref_forecast_type_wind_speed' : 'pref_forecast_type_uv_index')}
                    data={[
                        t('pref_forecast_type_humidity'),
                        t('pref_forecast_type_wind_speed'),
                        t('pref_forecast_type_uv_index'),
                    ]}
                    value={t(forecastType === 'humidity' ? 'pref_forecast_type_humidity' : forecastType === 'windSpeed' ? 'pref_forecast_type_wind_speed' : 'pref_forecast_type_uv_index')}
                    onSelect={handleForecastTypeChange} />
                <SelectPreference
                    title={t('pref_weather_provider')}
                    description={weatherProvider === 'openweathermap' ? 'OpenWeatherMap' : 'AccuWeather'}
                    data={[
                        'OpenWeatherMap',
                        'AccuWeather',
                    ]}
                    value={weatherProvider === 'openweathermap' ? 'OpenWeatherMap' : 'AccuWeather'}
                    onSelect={handleWeatherProviderChange} />
                <SwitchPreference
                    title={t('pref_auto_launch')}
                    description={t('pref_run_on_startup')}
                    checked={autoLaunch}
                    onChange={handleAutoLaunchChange} />
                <PreferenceSubheader
                    divider
                    title={t('pref_title_display')} />
                <SelectPreference
                    title={t('pref_unit')}
                    description={t(unit === 'imperial' ? 'pref_unit_imperial' : 'pref_unit_metric')}
                    data={[
                        t('pref_unit_imperial'),
                        t('pref_unit_metric'),
                    ]}
                    value={t(unit === 'imperial' ? 'pref_unit_imperial' : 'pref_unit_metric')}
                    onSelect={handleUnitChange} />
                <SelectPreference
                    title={t('pref_time_format')}
                    description={t(timeFormat === '12h' ? 'pref_time_format_12' : 'pref_time_format_24')}
                    data={[
                        t('pref_time_format_12'),
                        t('pref_time_format_24'),
                    ]}
                    value={t(timeFormat === '12h' ? 'pref_time_format_12' : 'pref_time_format_24')}
                    onSelect={handleTimeFormatChange} />
                <SwitchPreference
                    title={t('pref_blur_background')}
                    checked={backdropBlur > 0}
                    onChange={handleBlurBackgroundChange} />
                <SwitchPreference
                    title={t('pref_darken_background')}
                    checked={backdropDarken > 0}
                    onChange={handleDarkenBackgroundChange} />
                <SwitchPreference
                    title={t('pref_dark_mode')}
                    checked={darkMode}
                    onChange={handleDarkModeChange} />
                <PreferenceSubheader
                    divider
                    title={t('pref_title_app')} />
                <Preference
                    title={t('pref_documentation')}
                    onClick={handleDocumentation} />
                <Preference
                    title={t('pref_report_issue')}
                    onClick={handleReportIssue} />
                <Preference
                    title={t('pref_exit')}
                    onClick={handleExit} />
            </List>
        </Screen>
    );
};
