import React from 'react';

export const useDebounce = (value : any, delay = 250) => {
    const [ debouncedValue, setDebouncedValue, ] = React.useState(value);

    React.useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timer);
        };
    }, [ value, delay, ]);

    return debouncedValue;
};
