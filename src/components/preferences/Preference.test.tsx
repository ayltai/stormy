import React from 'react';

import { fireEvent, render, } from '../../utils/test';

import { Preference, } from './Preference';

describe('<Preference />', () => {
    it('renders correctly', () => {
        const handleClick = jest.fn();

        const { getByText, } = render(
            <Preference
                title='dummy'
                onClick={handleClick} />
        );

        fireEvent.click(getByText('dummy'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
