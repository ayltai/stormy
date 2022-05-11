import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import { Here, Place, } from '../models';

export const autocompleteApi = createApi({
    reducerPath : 'autocompleteApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'https://autocomplete.search.hereapi.com/v1',
    }),
    endpoints   : build => ({
        getAutocomplete : build.query<Here, string>({
            query : keyword => `/autocomplete?q=${keyword}&apiKey=${process.env.REACT_APP_API_KEY_HERE || ''}`,
        }),
    }),
});

export const geocodeApi = createApi({
    reducerPath : 'geocodeApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'https://geocode.search.hereapi.com/v1',
    }),
    endpoints   : build => ({
        getGeocode : build.query<Place, string>({
            query             : address => `/geocode?q=${address}&apiKey=${process.env.REACT_APP_API_KEY_HERE || ''}`,
            transformResponse : (response : Here) => ({
                name      : response.items[0].address.label,
                latitude  : response.items[0].position?.lat,
                longitude : response.items[0].position?.lng,
            }),
        }),
    }),
});

export const { useGetAutocompleteQuery, } = autocompleteApi;
export const { useGetGeocodeQuery,      } = geocodeApi;
