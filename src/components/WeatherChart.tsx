import { useTheme, } from '@mui/material';
import { QueryStatus, } from '@reduxjs/toolkit/query/react';
import { ChartData, TooltipItem, } from 'chart.js';
import { format, } from 'date-fns';
import React, { useCallback, useEffect, useState, } from 'react';

import { getWeatherQuery, } from '../apis';
import { useAppSelector, } from '../hooks';
import { convertSpeed, convertTemperature, getPartOfDay, handleError, } from '../utils';

import { ChartWrapper, } from './ChartWrapper';
import { getWeatherIcon, } from './WeatherIcon';

const FORECAST_TYPES = [
    'humidity',
    'windSpeed',
    'uvIndex',
];

export const WeatherChart = ({
    width,
    height,
    title,
    temperaturePrefix,
    humidityPrefix,
    precipPrefix,
    windSpeedPrefix,
    uvIndexPrefix,
} : {
    width              : number,
    height             : number,
    title?             : string,
    temperaturePrefix? : string,
    humidityPrefix?    : string,
    precipPrefix?      : string,
    windSpeedPrefix?   : string,
    uvIndexPrefix?     : string,
}) => {
    const theme = useTheme();

    const { darkMode, forecastHours, forecastType, refreshInterval, selectedPlace, timeFormat, unit, weatherProvider, } = useAppSelector(state => state.settings);

    const { data, error, status, } = getWeatherQuery(weatherProvider)(selectedPlace, {
        pollingInterval : refreshInterval,
    });

    const [ scales,    setScales,    ] = useState({});
    const [ tooltips,  setTooltips,  ] = useState({});
    const [ minScale,  setMinScale,  ] = useState<number>(0);
    const [ maxScale,  setMaxScale,  ] = useState<number>(0);
    const [ chartData, setChartData, ] = useState<ChartData<'line', number[], string>>({
        labels   : [],
        datasets : [],
    });

    const commonDataset = {
        label           : '',
        clip            : 8,
        pointRadius     : 0,
        pointHitRadius  : 16,
        backgroundColor : darkMode ? theme.palette.primary.dark : theme.palette.primary.light,
        borderColor     : darkMode ? theme.palette.info.dark : theme.palette.info.light,
        tension         : 0.5,
    };

    const createData = useCallback(() : ChartData<'line', number[], string> => ({
        labels   : [],
        datasets : [
            {
                ...commonDataset,
                yAxisID         : 'temp',
                order           : 0,
                data            : [],
                clip            : 12,
                pointRadius     : undefined,
                backgroundColor : darkMode ? theme.palette.primary.dark : theme.palette.primary.light,
                borderColor     : darkMode ? theme.palette.secondary.dark : theme.palette.secondary.light,
            },
            {
                ...commonDataset,
                yAxisID         : 'precip',
                order           : 3,
                data            : [],
                clip            : 12,
                fill            : 'origin',
                backgroundColor : darkMode ? theme.palette.primary.dark : theme.palette.primary.light,
                borderColor     : darkMode ? theme.palette.primary.dark : theme.palette.primary.light,
            },
            {
                label : '',
                order : 1,
                data  : [],
            },
            {
                ...commonDataset,
                yAxisID : FORECAST_TYPES[0],
                hidden  : forecastType !== FORECAST_TYPES[0],
                order   : forecastType === FORECAST_TYPES[0] ? 2 : 0,
                data    : [],
            },
            {
                ...commonDataset,
                yAxisID : FORECAST_TYPES[1],
                hidden  : forecastType !== FORECAST_TYPES[1],
                order   : forecastType === FORECAST_TYPES[1] ? 2 : 0,
                data    : [],
            },
            {
                ...commonDataset,
                yAxisID : FORECAST_TYPES[2],
                hidden  : forecastType !== FORECAST_TYPES[2],
                order   : forecastType === FORECAST_TYPES[2] ? 2 : 0,
                data    : [],
            },
        ],
    }), [ darkMode, forecastType, theme, ]);

    const updateData = useCallback((newData : ChartData<'line', number[], string>) : ChartData<'line', number[], string> => {
        if (data) {
            for (let i = 0; i < FORECAST_TYPES.length; i++) newData.datasets[i + 3].hidden = forecastType !== FORECAST_TYPES[i];

            const icons : HTMLImageElement[] = [];

            for (let i = 0; i < forecastHours; i++) {
                const weather = data.hourly[i];

                newData.labels!.push(format(weather.time, timeFormat === '12h' ? 'haaa' : 'Haaa'));
                newData.datasets[0].data.push(convertTemperature({
                    temperature : weather.temperature,
                    unit,
                }) as number);
                newData.datasets[1].data.push(weather.precipProbability);
                newData.datasets[2].data.push(weather.precipIntensity);
                newData.datasets[3].data.push(weather.humidity);
                newData.datasets[4].data.push(convertSpeed({
                    value : weather.windSpeed,
                    unit,
                }) as number);
                if (weather.uvIndex || weather.uvIndex === 0) newData.datasets[5].data.push(weather.uvIndex);

                const icon = new Image(24, 24);
                icon.src = `img/${darkMode ? 'dark' : 'light'}/${getWeatherIcon({
                    weatherProvider,
                    iconId    : weather.icon,
                    partOfDay : getPartOfDay(weather.time),
                }) || 'wi-na'}.svg`;

                icons.push(icon);
            }

            newData.datasets[0].pointStyle = context => icons[context.dataIndex];
        }

        return newData;
    }, [ darkMode, data, forecastType, theme, timeFormat, unit, weatherProvider, ]);

    const commonScale = {
        position : 'right',
        grid     : {
            borderColor     : theme.palette.text.primary,
            drawOnChartArea : false,
            color           : theme.palette.text.primary,
        },
    };

    const createScales = useCallback(() => {
        if (status === QueryStatus.fulfilled && chartData.datasets.length) {
            const newScales = {
                x      : {
                    grid : {
                        borderColor     : theme.palette.text.primary,
                        drawOnChartArea : false,
                        color           : theme.palette.text.primary,
                    },
                },
                temp   : {
                    position : 'left',
                    grid     : {
                        borderColor     : theme.palette.text.primary,
                        drawOnChartArea : false,
                        color           : theme.palette.text.primary,
                    },
                    min      : minScale,
                    max      : maxScale,
                    ticks    : {
                        stepSize : maxScale - minScale,
                        callback : (value : number) => convertTemperature({
                            unit,
                            temperature    : value,
                            displayUnit    : true,
                            fractionDigits : 0,
                        }),
                    },
                },
                precip : {
                    display  : false,
                    position : 'left',
                    min      : 0,
                    max      : 100,
                    ticks    : {
                        stepSize : 50,
                    },
                },
                humidity : {
                    ...commonScale,
                    display : forecastType === FORECAST_TYPES[0],
                    min     : 0,
                    max     : 100,
                    ticks   : {
                        stepSize : 50,
                        callback : (label : number | string) => `${label}%`,
                    },
                },
                windSpeed : {
                    ...commonScale,
                    display      : forecastType === FORECAST_TYPES[1],
                    min          : 0,
                    suggestedMax : Math.max(unit === 'metric' ? 200 : 120, ...chartData.datasets[4].data.map(item => Math.ceil(item))),
                    ticks        : {
                        stepSize : Math.max(unit === 'metric' ? 50 : 30, ...chartData.datasets[4].data.map(item => Math.ceil(item / 4))),
                        callback : (value : number) => `${convertSpeed({
                            unit,
                            value,
                            displayUnit    : true,
                            fractionDigits : 0,
                        })}`,
                    },
                },
                uvIndex : {
                    ...commonScale,
                    display      : forecastType === FORECAST_TYPES[2],
                    suggestedMin : 0,
                    suggestedMax : 12,
                    ticks        : {
                        stepSize : 2,
                    },
                },
            };

            return newScales;
        }

        return {};
    }, [ chartData, forecastType, theme, maxScale, minScale, status, unit, ]);

    const createTooltips = useCallback(() => ({
        displayColors : false,
        callbacks     : {
            label : (context : TooltipItem<'line'>) => [
                `${temperaturePrefix || ''}${convertTemperature({
                    unit,
                    temperature : context.chart.data.datasets[0].data[context.dataIndex] as number,
                    displayUnit : true,
                })}`,
                `${precipPrefix || ''}${Math.round(context.chart.data.datasets[1].data[context.dataIndex] as number)}% ${Math.round(context.chart.data.datasets[2].data[context.dataIndex] as number)}mm`,
                context.chart.data.datasets[3].data[context.dataIndex] || context.chart.data.datasets[3].data[context.dataIndex] === 0 ? `${humidityPrefix || ''}${Math.round(context.chart.data.datasets[3].data[context.dataIndex] as number)}%` : '',
                `${windSpeedPrefix || ''}${convertSpeed({
                    unit,
                    value       : context.chart.data.datasets[4].data[context.dataIndex] as number,
                    displayUnit : true,
                })}`,
                context.chart.data.datasets[5].data[context.dataIndex] || context.chart.data.datasets[5].data[context.dataIndex] === 0 ? `${uvIndexPrefix || ''}${Math.round(context.chart.data.datasets[5].data[context.dataIndex] as number)}` : '',
            ],
        },
    }), [ humidityPrefix, precipPrefix, temperaturePrefix, unit, uvIndexPrefix, windSpeedPrefix, ]);

    useEffect(() => {
        if (status === QueryStatus.fulfilled) setChartData(updateData(createData()));
    }, [ createData, status, updateData, ]);

    useEffect(() => {
        if (status === QueryStatus.fulfilled && chartData.datasets.length) {
            setMinScale(Math.floor(Math.min(...chartData.datasets[0].data)));
            setMaxScale(Math.ceil(Math.max(...chartData.datasets[0].data)));
        }
    }, [ chartData, status, ]);

    useEffect(() => {
        if (status === QueryStatus.fulfilled) {
            setScales(createScales());
            setTooltips(createTooltips());
        }
    }, [ chartData, createTooltips, minScale, maxScale, status, ]);

    useEffect(() => {
        if (error) handleError(error);
    }, [ error, ]);

    return (
        <ChartWrapper
            width={width}
            height={height}
            chartId='chart'
            chartOptions={{
                plugins : {
                    legend  : {
                        display : false,
                    },
                    title   : {
                        display : true,
                        padding : 0,
                        font    : {
                            weight : 'normal',
                        },
                        text    : title,
                    },
                    tooltip : tooltips,
                },
                scales,
            }}
            chartData={chartData.datasets.length ? chartData : undefined} />
    );
};
