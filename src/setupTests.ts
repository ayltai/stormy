import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

Object.defineProperty(window, 'matchMedia', {
    writable : true,
    value    : jest.fn().mockImplementation(query => ({
        matches             : false,
        media               : query,
        onchange            : null,
        addListener         : jest.fn(),
        removeListener      : jest.fn(),
        addEventListener    : jest.fn(),
        removeEventListener : jest.fn(),
        dispatchEvent       : jest.fn(),
    })),
});

jest.mock('react-i18next', () => ({
    useTranslation : () => ({
        t : (key : string, options? : object) => `${key}${options ? JSON.stringify(options) : ''}`,
    }),
}));
