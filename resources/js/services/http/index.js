import axios from "axios";

// We gebruiken een "baseURL" zodat we niet overal /api voor hoeven te zetten
const baseURL = '/api';

const http = axios.create({
    baseURL,
    headers: {
        // Met deze header geef je aan welk soort content je verwacht terug te krijgen van de server.
        Accept: 'application/json',
        // Deze header geeft aan in welk formaat de body van het verzoek is verzonden naar de server.
        'Content-Type': 'application/json',
    },
});

/**
 * send a get request to the given endpoint
 */
// @ts-ignore
export const getRequest = (endpoint) => http.get(endpoint);

/**
 * send a post request to the given endpoint with the given data
 */
// @ts-ignore
export const postRequest = (endpoint, data) => http.post(endpoint, data);

/**
 * send a post request to the given endpoint with the given data
 */
// @ts-ignore
export const updateRequest =  (endpoint, data) => http.put(endpoint, data);
/**
 * send a post request to the given endpoint with the given data
 */
// @ts-ignore
export const deleteRequest = (endpoint) => http.delete(endpoint);