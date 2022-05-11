import { useEffect, useLayoutEffect, useRef, } from 'react';

export const useInterval = (callback : () => void, interval : number) => {
    const callbackRef = useRef(callback);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    }, [ callback, ]);

    useEffect(() => {
        const id = setInterval(() => callbackRef.current(), interval);

        return () => clearInterval(id);
    }, [ interval, ]);
};
