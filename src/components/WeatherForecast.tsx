import { Grid, Slider, styled, } from '@mui/material';
import { QueryStatus, } from '@reduxjs/toolkit/query/react';
import { format, intlFormat, } from 'date-fns';
import React, { useEffect, } from 'react';

import { getWeatherQuery, } from '../apis';
import { useAppSelector, } from '../hooks';
import { capitalize, convertTemperature, getAlphaForPrecipIntensity, handleError, makeTransparent, } from '../utils';

import { Label, } from './Label';
import { Temperature, } from './Temperature';
import { WeatherIcon, } from './WeatherIcon';

const StyledSlider = styled(Slider)(({ theme, }) => ({
    cursor               : 'auto',
    '& .MuiSlider-thumb' : {
        visibility : 'hidden',
    },
    '& .MuiSlider-track' : {
        color : theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
    },
}));

export const WeatherForecast = () => {
    const { forecastDays, refreshInterval, selectedPlace, unit, weatherProvider, } = useAppSelector(state => state.settings);

    const { data, error, status, } = getWeatherQuery(weatherProvider)(selectedPlace, {
        pollingInterval : refreshInterval,
    });

    useEffect(() => error && handleError(error), [ error, ]);

    return (
        <Grid
            container
            direction='row'
            justifyContent='space-evenly'>
            {status === QueryStatus.fulfilled && data && data.daily.slice(0, forecastDays).map((weather, index) => {
                const StyledGrid = styled(Grid)(({ theme, }) => ({
                    backgroundImage         : `linear-gradient(to top, ${theme.palette.mode === 'dark' ? makeTransparent(theme.palette.primary.dark, getAlphaForPrecipIntensity(data.daily[index].precipIntensity / 24)) : makeTransparent(theme.palette.primary.light, getAlphaForPrecipIntensity(data.daily[index].precipIntensity / 24))} 0%, ${makeTransparent(theme.palette.background.paper, getAlphaForPrecipIntensity(data.daily[index].precipIntensity))} ${Math.round(data.daily[index].precipProbability / 2.5)}%)`,
                    borderBottomLeftRadius  : theme.shape.borderRadius,
                    borderBottomRightRadius : theme.shape.borderRadius,
                }));

                return (
                    <Grid
                        key={index}
                        item>
                        <StyledGrid
                            container
                            direction='column'
                            alignItems='center'>
                            <Grid item>
                                <Label
                                    paddingTop={1}
                                    variant='body1'
                                    tooltip={intlFormat(data.daily[index].time)}>
                                    {format(data.daily[index].time, 'E')}
                                </Label>
                            </Grid>
                            <Grid item>
                                <WeatherIcon
                                    padding={1}
                                    variant='h4'
                                    iconId={data.daily[index].icon}
                                    description={capitalize(data.daily[index].summary)} />
                            </Grid>
                            <Grid item>
                                <Temperature
                                    variant='body2'
                                    temperature={data.daily[index].temperatureHigh} />
                            </Grid>
                            <Grid
                                item
                                height={96}
                                padding={1}>
                                <StyledSlider
                                    orientation='vertical'
                                    color='primary'
                                    min={data ? Number(convertTemperature({
                                        unit,
                                        temperature    : Math.min(...data.daily.slice(0, forecastDays).map(day => day.temperatureLow)) - 0.5,
                                        fractionDigits : 0,
                                    })) : 0}
                                    max={data ? Number(convertTemperature({
                                        unit,
                                        temperature    : Math.max(...data.daily.slice(0, forecastDays).map(day => day.temperatureHigh)) + 0.5,
                                        fractionDigits : 0,
                                    })) : 0}
                                    value={[
                                        Number(convertTemperature({
                                            unit,
                                            temperature    : data.daily[index].temperatureLow,
                                            fractionDigits : 0,
                                        })),
                                        Number(convertTemperature({
                                            unit,
                                            temperature    : data.daily[index].temperatureHigh,
                                            fractionDigits : 0,
                                        })),
                                    ]}
                                    valueLabelDisplay='off' />
                            </Grid>
                            <Grid item>
                                <Temperature
                                    variant='body2'
                                    temperature={data.daily[index].temperatureLow} />
                            </Grid>
                            <Grid
                                item
                                container
                                paddingBottom={1}
                                direction='row'>
                                <Grid
                                    item
                                    xs={4}>
                                    <Label
                                        width='100%'
                                        variant='body2'
                                        align='right'>
                                        <i className='wi wi-rain' />
                                    </Label>
                                </Grid>
                                <Grid
                                    item
                                    xs={8}>
                                    <Label
                                        paddingLeft={1}
                                        variant='body2'
                                        tooltip={`${Math.round(data.daily[index].precipProbability)}% ${Math.round(data.daily[index].precipIntensity)}mm`}>
                                        {`${Math.round(data.daily[index].precipProbability)}%`}
                                    </Label>
                                </Grid>
                            </Grid>
                        </StyledGrid>
                    </Grid>
                );
            })}
        </Grid>
    );
};
