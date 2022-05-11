import React from 'react';

import { defaultState, render, } from '../utils/test';

import { Temperature, } from './Temperature';

describe('<Temperature />', () => {
    it('renders metric temperature value correctly', () => {
        const { getByText, } = render(
            <Temperature
                displayUnit={false}
                temperature={20} />,
            {
                preloadedState : {
                    settings : {
                        ...defaultState.settings,
                        unit : 'metric',
                    },
                },
            });

        expect(getByText('20')).toBeInTheDocument();
    });

    it('renders imperial temperature value correctly', () => {
        const { getByText, } = render(
            <Temperature
                displayUnit={false}
                temperature={20} />,
            {
                preloadedState : {
                    settings : {
                        ...defaultState.settings,
                        unit : 'imperial',
                    },
                },
            });

        expect(getByText('68')).toBeInTheDocument();
    });
});
