import fetchMock from 'jest-fetch-mock';
import React from 'react';

import { openweathermapApi, unsplashApi, } from '../apis';
import { store, } from '../redux';
import { act, DEFAULT_LOCATION, MOCK_WEATHER_RESPONSE, render, } from '../utils/test';

import { WeatherNow, } from './WeatherNow';

const MOCK_UNSPLASH_RESPONSE = {
    'id'                       : 'Dwu85P9SOIk',
    'created_at'               : '2016-05-03T11:00:28-04:00',
    'updated_at'               : '2016-07-10T11:00:01-05:00',
    'width'                    : 2448,
    'height'                   : 3264,
    'color'                    : '#6e633a',
    'blur_hash'                : 'LFC$yHwc8^$yIAS$%M%00KxukYIp',
    'downloads'                : 1345,
    'likes'                    : 24,
    'liked_by_user'            : false,
    'description'              : 'A man drinking a coffee.',
    'exif'                     : {
        'make'          : 'Canon',
        'model'         : 'Canon EOS 40D',
        'exposure_time' : '0.011111111111111112',
        'aperture'      : '4.970854',
        'focal_length'  : '37',
        'iso'           : 100,
    },
    'location'                 : {
        'name'     : 'Montreal, Canada',
        'city'     : 'Montreal',
        'country'  : 'Canada',
        'position' : {
            'latitude'  : 45.473298,
            'longitude' : -73.638488,
        },
    },
    'current_user_collections' : [
        {
            'id'                : 206,
            'title'             : 'Makers: Cat and Ben',
            'published_at'      : '2016-01-12T18:16:09-05:00',
            'last_collected_at' : '2016-06-02T13:10:03-04:00',
            'updated_at'        : '2016-07-10T11:00:01-05:00',
            'cover_photo'       : null,
            'user'              : null,
        },
    ],
    'urls'                     : {
        'raw'     : 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
        'full'    : 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg',
        'regular' : 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max',
        'small'   : 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max',
        'thumb'   : 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max',
    },
    'links'                    : {
        'self'              : 'https://api.unsplash.com/photos/Dwu85P9SOIk',
        'html'              : 'https://unsplash.com/photos/Dwu85P9SOIk',
        'download'          : 'https://unsplash.com/photos/Dwu85P9SOIk/download',
        'download_location' : 'https://api.unsplash.com/photos/Dwu85P9SOIk/download',
    },
    'user'                     : {
        'id'                 : 'QPxL2MGqfrw',
        'updated_at'         : '2016-07-10T11:00:01-05:00',
        'username'           : 'exampleuser',
        'name'               : 'Joe Example',
        'portfolio_url'      : 'https://example.com/',
        'bio'                : 'Just an everyday Joe',
        'location'           : 'Montreal',
        'total_likes'        : 5,
        'total_photos'       : 10,
        'total_collections'  : 13,
        'instagram_username' : 'instantgrammer',
        'twitter_username'   : 'crew',
        'links'              : {
            'self'      : 'https://api.unsplash.com/users/exampleuser',
            'html'      : 'https://unsplash.com/exampleuser',
            'photos'    : 'https://api.unsplash.com/users/exampleuser/photos',
            'likes'     : 'https://api.unsplash.com/users/exampleuser/likes',
            'portfolio' : 'https://api.unsplash.com/users/exampleuser/portfolio',
        },
    },
};

describe('<WeatherNow />', () => {
    it('renders correctly', async () => {
        const { getByText, } = render(<WeatherNow />, {
            store,
        });

        await act(async () => {
            fetchMock.mockResponseOnce(JSON.stringify(MOCK_UNSPLASH_RESPONSE));
            await store.dispatch(unsplashApi.endpoints.getRandomPhoto.initiate('dummy'));

            fetchMock.mockResponseOnce(JSON.stringify(MOCK_WEATHER_RESPONSE));
            await store.dispatch(openweathermapApi.endpoints.getOneCallWeather.initiate(DEFAULT_LOCATION));
        });

        expect(getByText('282unit_metric_temperature')).toBeInTheDocument();
    });
});
