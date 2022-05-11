import { QueryStatus, } from '@reduxjs/toolkit/query/react';
import { Grid, Skeleton, } from '@mui/material';
import { format, } from 'date-fns';
import React, { useCallback, useEffect, } from 'react';
import { useTranslation, } from 'react-i18next';

import { getWeatherQuery, } from '../apis';
import { BACKDROP_WIDTH, } from '../Constants';
import { useAppSelector, } from '../hooks';
import { capitalize, getPartOfDay, handleError, } from '../utils';

import { Backdrop, } from './Backdrop';
import { Label, } from './Label';
import { Speed, } from './Speed';
import { Temperature, } from './Temperature';
import { WeatherIcon, } from './WeatherIcon';

export const WeatherNow = ({
    onLoad,
} : {
    onLoad?          : ({
        photoAuthor,
        photoLink,
    } : {
        photoAuthor : string,
        photoLink   : string,
    }) => void,
}) => {
    const { t, } = useTranslation();

    const { backdropBlur, backdropDarken, refreshInterval, selectedPlace, weatherProvider, } = useAppSelector(state => state.settings);

    const { data, error, status, } = getWeatherQuery(weatherProvider)(selectedPlace, {
        pollingInterval : refreshInterval,
    });

    const summary = useCallback(() => status === QueryStatus.pending ? (
        <Skeleton variant='text' />
    ) : (
        <Label
            noWrap
            display='block'
            overflow='hidden'
            textOverflow='ellipsis'
            variant='body1'>
            {status === QueryStatus.fulfilled ? capitalize(data?.current.summary || '') : JSON.stringify(error)}
        </Label>
    ), [ data, error, status, ]);

    const temperature = useCallback(() => status === QueryStatus.pending ? (
        <Skeleton variant='text' />
    ) : status === QueryStatus.fulfilled ? (
        <Temperature
            width='100%'
            variant='h4'
            align='center'
            temperature={data?.current.temperature} />
    ) : null, [ data, status, ]);

    const weatherIcon = useCallback(() => status === QueryStatus.pending ? (
        <Skeleton variant='circular' />
    ) : status === QueryStatus.fulfilled ? (
        <WeatherIcon
            width='100%'
            paddingTop={1.5}
            variant='h2'
            align='center'
            iconId={data?.current.icon}
            partOfDay={getPartOfDay(Date.now())} />
    ) : null, [ data, status, ]);

    const humidityAndWindSpeed = useCallback(() => status === QueryStatus.rejected ? null : (
        <Grid
            container
            columnSpacing={1}>
            <Grid
                item
                xs={4}>
                <Label
                    width='100%'
                    variant='body2'
                    align='right'
                    tooltip={t('humidity')}>
                    <i className='wi wi-humidity' />
                </Label>
            </Grid>
            <Grid
                item
                xs={8}>
                {status === QueryStatus.pending ? (
                    <Skeleton variant='text' />
                ) : data && (
                    <Label variant='body2'>
                        {`${data?.current.humidity}%`}
                    </Label>
                )}
            </Grid>
            <Grid
                item
                xs={4}>
                <Label
                    width='100%'
                    variant='body2'
                    align='right'
                    tooltip={t('wind_speed')}>
                    <i className='wi wi-strong-wind' />
                </Label>
            </Grid>
            <Grid
                item
                xs={8}>
                {status === QueryStatus.pending ? (
                    <Skeleton variant='text' />
                ) : (
                    <Speed
                        variant='body2'
                        speed={data?.current.windSpeed} />
                )}
            </Grid>
        </Grid>
    ), [ data, status, ]);

    useEffect(() => {
        if (error) handleError(error);
    }, [ error, ]);

    return (
        <Backdrop
            keyword={data ? `${data.current.summary} ${format(Date.now(), 'B')}` : undefined}
            refreshInterval={refreshInterval}
            blur={backdropBlur}
            darken={backdropDarken}
            onLoad={onLoad}>
            <Grid
                container
                paddingBottom={1}
                direction='column'
                alignItems='center'
                justifyContent='space-evenly'>
                <Grid
                    item
                    width={BACKDROP_WIDTH}>
                    <Label
                        noWrap
                        padding={1}
                        display='block'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        variant='body2'
                        tooltip={selectedPlace.name}>
                        {selectedPlace.name}
                    </Label>
                </Grid>
                <Grid item>
                    {summary()}
                </Grid>
                <Grid
                    item
                    container
                    direction='row'
                    alignItems='center'
                    justifyContent='center'>
                    <Grid
                        item
                        xs={4}>
                        {temperature()}
                    </Grid>
                    <Grid
                        item
                        xs={4}>
                        {weatherIcon()}
                    </Grid>
                    <Grid
                        item
                        xs={4}>
                        {humidityAndWindSpeed()}
                    </Grid>
                </Grid>
            </Grid>
        </Backdrop>
    );
};
