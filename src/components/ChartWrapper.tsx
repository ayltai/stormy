import { Box, useTheme, } from '@mui/material';
import { CategoryScale, Chart, ChartData, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, } from 'chart.js';
import React, { useEffect, useRef, } from 'react';

import { useAppSelector, } from '../hooks';

Chart.register(CategoryScale, Filler, LinearScale, LineController, LineElement, Legend, PointElement, Title, Tooltip);

export const ChartWrapper = ({
    width,
    height,
    chartId,
    chartData,
    chartOptions,
} : {
    width         : number,
    height        : number,
    chartId       : string,
    chartData?    : ChartData<'line', number[], string>,
    chartOptions? : any,
}) => {
    const theme = useTheme();

    const darkMode = useAppSelector(state => state.settings.darkMode);

    const chart = useRef<Chart>();

    useEffect(() => {
        Chart.defaults.color                           = theme.palette.text.primary;
        Chart.defaults.font.family                     = theme.typography.fontFamily;
        Chart.defaults.font.size                       = theme.typography.fontSize - 4;
        Chart.defaults.plugins.tooltip.backgroundColor = `rgba(${darkMode ? '97, 97, 97' : '158, 158, 158'}, 0.9)`;
    }, [ darkMode, theme, ]);

    useEffect(() => {
        if (chartData) {
            chart.current = new Chart<'line', number[], string>(chartId, {
                type    : 'line',
                data    : chartData,
                options : {
                    layout : {
                        padding : {
                            left   : 8,
                            right  : 8,
                            top    : 4,
                            bottom : 4,
                        },
                    },
                    ...chartOptions,
                },
            });

            return () => {
                if (chart.current) chart.current.destroy();
            };
        }
    }, [ chartData, chartId, chartOptions, height, width, ]);

    return (
        <Box
            width={width}
            height={height}
            alignItems='center'
            justifyContent='center'>
            <canvas
                role='figure'
                id={chartId}
                width={width - 16}
                height={height - 16} />
        </Box>
    );
};
