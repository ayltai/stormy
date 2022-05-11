import React from 'react';

import { defaultState, render, } from '../utils/test';

import { Speed, } from './Speed';

describe('<Speed />', () => {
    it('renders metric speed value correctly', () => {
        const { getByText, } = render(
            <Speed
                displayUnit={false}
                speed={10} />,
            {
                preloadedState : {
                    settings : {
                        ...defaultState.settings,
                        unit : 'metric',
                    },
                },
            });

        expect(getByText('10')).toBeInTheDocument();
    });

    it('renders imperial speed value correctly', () => {
        const { getByText, } = render(
            <Speed
                displayUnit={false}
                speed={10} />,
            {
                preloadedState : {
                    settings : {
                        ...defaultState.settings,
                        unit : 'imperial',
                    },
                },
            });

        expect(getByText('6')).toBeInTheDocument();
    });
});
