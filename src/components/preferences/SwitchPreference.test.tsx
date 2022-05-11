import React from 'react';

import { fireEvent, render, } from '../../utils/test';

import { SwitchPreference, } from './SwitchPreference';

describe('<SwitchPreference />', () => {
    it('renders correctly', () => {
        const handleChange = jest.fn();

        const { getByRole, } = render(
            <SwitchPreference
                title='dummy'
                checked={false}
                onChange={handleChange} />
        );

        fireEvent.click(getByRole('checkbox'), {
            target : {
                checked : '',
            },
        });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(true);
    });
});
