import { Box, Skeleton, } from '@mui/material';
import React, { useEffect, } from 'react';

import { useGetRandomPhotoQuery, } from '../apis';
import { BACKDROP_HEIGHT, REFRESH_INTERVAL, } from '../Constants';
import { handleError, } from '../utils';

export const Backdrop = ({
    keyword,
    refreshInterval = REFRESH_INTERVAL,
    blur            = 0,
    darken          = 0,
    children,
    onLoad,
} : {
    keyword?         : string,
    refreshInterval? : number,
    blur?            : number,
    darken?          : number,
    children?        : React.ReactNode,
    onLoad?          : ({
        photoAuthor,
        photoLink,
    } : {
        photoAuthor : string,
        photoLink   : string,
    }) => void,
}) => {
    const { data, isLoading, error, } = useGetRandomPhotoQuery(keyword || '', {
        pollingInterval : refreshInterval,
        skip            : !keyword,
    });

    useEffect(() => {
        if (data && onLoad) {
            onLoad({
                photoAuthor : data.user.name,
                photoLink   : data.links.html,
            });
        }
    }, [ data, ]);

    useEffect(() => {
        if (error) handleError(error);
    }, [ error, ]);

    return (
        <Box paddingBottom={1}>
            {isLoading ? (
                <Skeleton
                    width='100%'
                    height={BACKDROP_HEIGHT}
                    variant='rectangular' />
            ) : (
                <Box
                    width='100%'
                    height={BACKDROP_HEIGHT}
                    style={{
                        backgroundImage    : data ? `url(${data.urls.raw}?q=80&fm=jpeg&w=800&crop=entropy&fit=crop)` : 'none',
                        backgroundPosition : '50% 50%',
                        backgroundSize     : 'cover',
                        filter             : `${blur ? `blur(${blur}px)` : ''}${blur && darken ? ' ' : !blur && !darken ? 'none' : ''}${darken ? `brightness(${100 - darken}%)` : ''}`,
                    }} />
            )}
            <Box
                position='absolute'
                left={0}
                top={0}>
                {children}
            </Box>
        </Box>
    );
};
