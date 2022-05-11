import React from 'react';

import { fireEvent, render, } from '../utils/test';

import { Action, } from './Action';

describe('<Action />', () => {
    it('triggers onClick when clicked', () => {
        const handleClick = jest.fn();

        const { getByRole, } = render(
            <Action
                icon='dummy'
                onClick={handleClick} />
        );

        fireEvent.click(getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
