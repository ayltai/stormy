import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import { Photo, } from '../models';

export const unsplashApi = createApi({
    reducerPath : 'unsplashApi',
    baseQuery   : fetchBaseQuery({
        baseUrl        : 'https://api.unsplash.com',
        prepareHeaders : headers => {
            if (process.env.REACT_APP_API_KEY_UNSPLASH) headers.set('Authorization', `Client-ID ${process.env.REACT_APP_API_KEY_UNSPLASH}`);
            return headers;
        },
    }),
    endpoints   : build => ({
        getRandomPhoto : build.query<Photo, string>({
            query : keyword => `/photos/random?query=${keyword}`,
        }),
    }),
});

export const { useGetRandomPhotoQuery, } = unsplashApi;
