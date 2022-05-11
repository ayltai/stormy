import React, { useMemo, } from 'react';
import { useTranslation, } from 'react-i18next';

import { useAppSelector, } from '../hooks';
import { Label, } from './Label';

export const Speed = ({
    speed,
    displayTooltip = true,
    displayUnit    = true,
    fractionDigits = 0,
    ...rest
} : {
    speed?            : number,
    displayTooltip?   : boolean,
    displayUnit?      : boolean,
    fractionDigits?   : number,
    [ rest : string ] : any,
}) => {
    const { t, } = useTranslation();

    const unit  = useAppSelector(state => state.settings.unit);
    const value = useMemo(() => speed ? unit === 'imperial' ? speed / 1.609344 : speed : undefined, [ speed, unit, ]);

    return value ? (
        <Label
            {...rest}
            tooltip={displayTooltip ? `${value.toFixed(fractionDigits)}${t(unit === 'metric' ? 'unit_metric_speed' : 'unit_imperial_speed')}` : ''}>
            {`${Math.round(value)}${displayUnit ? t(unit === 'metric' ? 'unit_metric_speed' : 'unit_imperial_speed') : ''}`}
        </Label>
    ) : null;
};
