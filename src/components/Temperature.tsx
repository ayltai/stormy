import React, { useMemo, } from 'react';
import { useTranslation, } from 'react-i18next';

import { useAppSelector, } from '../hooks';
import { Label, } from './Label';

export const Temperature = ({
    temperature,
    displayTooltip = true,
    displayUnit    = true,
    fractionDigits = 1,
    ...rest
} : {
    temperature?      : number,
    displayTooltip?   : boolean,
    displayUnit?      : boolean,
    fractionDigits?   : number,
    [ rest : string ] : any,
}) => {
    const { t, } = useTranslation();

    const unit  = useAppSelector(state => state.settings.unit);
    const value = useMemo(() => temperature ? unit === 'metric' ? temperature : (temperature * 9 / 5) + 32 : undefined, [ temperature, unit, ]);

    return value ? (
        <Label
            {...rest}
            tooltip={displayTooltip ? `${value.toFixed(fractionDigits)}${t(unit === 'metric' ? 'unit_metric_temperature' : 'unit_imperial_temperature')}` : ''}>
            {`${ Math.round(value)}${displayUnit ? t(unit === 'metric' ? 'unit_metric_temperature' : 'unit_imperial_temperature') : ''}`}
        </Label>
    ) : null;
};
