import { Box, Divider, Grid, useTheme, } from '@mui/material';
import { InfoOutlined, Settings, } from '@mui/icons-material';
import { QueryStatus, } from '@reduxjs/toolkit/query';
import { formatDistanceToNow, } from 'date-fns';
import React, { useEffect, useState, } from 'react';
import { useTranslation, } from 'react-i18next';
import { useNavigate, } from 'react-router-dom';

import { getWeatherQuery, } from '../apis';
import { Action, getWeatherIcon, Label, WeatherChart, WeatherForecast, WeatherNow, } from '../components';
import { useAppSelector, } from '../hooks';
import { handleError, openUrl, updateMenu, } from '../utils';

export const Home = () => {
    const theme    = useTheme();
    const navigate = useNavigate();

    const { t, } = useTranslation();

    const [ imageAuthor, setImageAuthor, ] = useState<string | undefined>();
    const [ imageLink,   setImageLink,   ] = useState<string | undefined>();
    const [ lastUpdate,  setLastUpdate,  ] = useState<number>(0);

    const { forecastHours, refreshInterval, selectedPlace, weatherProvider, } = useAppSelector(state => state.settings);

    const { data, error, status, } = getWeatherQuery(weatherProvider)(selectedPlace, {
        pollingInterval : refreshInterval,
    });

    const handleOnLoad = ({
        photoAuthor,
        photoLink,
    } : {
        photoAuthor : string,
        photoLink   : string,
    }) => {
        setImageAuthor(photoAuthor);
        setImageLink(photoLink);
        setLastUpdate(Date.now());
    };

    const handleSettingsClick = () => navigate('/settings');

    const handleInfoClick = () => imageLink && openUrl(imageLink);

    useEffect(() => {
        if (data && status === QueryStatus.fulfilled) {
            updateMenu({
                temperature : data.current.temperature,
                icon        : getWeatherIcon({
                    iconId : data.current.icon,
                    weatherProvider,
                }),
            });
        }
    }, [ data, status, weatherProvider, ]);

    useEffect(() => {
        if (error) handleError(error);
    }, [ error, ]);

    return (
        <Grid
            container
            direction='column'
            bgcolor={theme.palette.background.paper}>
            <Grid item>
                <WeatherNow onLoad={handleOnLoad} />
            </Grid>
            <Box height={1} />
            <Grid item>
                <WeatherChart
                    width={320}
                    height={160}
                    title={t('title_chart', {
                        hour : forecastHours,
                    })}
                    temperaturePrefix={t('chart_temperature')}
                    humidityPrefix={t('chart_humidity')}
                    precipPrefix={t('chart_precip')}
                    windSpeedPrefix={t('chart_wind_speed')}
                    uvIndexPrefix={t('chart_uv_index')} />
            </Grid>
            <Divider
                flexItem
                orientation='horizontal' />
            <Grid item>
                <WeatherForecast />
            </Grid>
            <Grid
                item
                container
                direction='row'>
                <Grid
                    item
                    xs={2}>
                    <Action
                        tooltip={t('settings')}
                        icon={<Settings />}
                        onClick={handleSettingsClick} />
                </Grid>
                <Grid
                    item
                    container
                    zeroMinWidth
                    xs={8}
                    alignItems='center'
                    justifyContent='center'>
                    {lastUpdate > 0 && (
                        <Label
                            noWrap
                            color='secondary'
                            tooltip={t('last_update', {
                                timestamp : formatDistanceToNow(lastUpdate),
                            })}
                            variant='caption'>
                            {t('last_update', {
                                timestamp : formatDistanceToNow(lastUpdate),
                            })}
                        </Label>
                    )}
                </Grid>
                <Grid
                    item
                    container
                    xs={2}
                    justifyContent='flex-end'>
                    <Action
                        tooltip={t('info', {
                            imageAuthor,
                        })}
                        icon={<InfoOutlined />}
                        onClick={handleInfoClick} />
                </Grid>
            </Grid>
        </Grid>
    );
};
