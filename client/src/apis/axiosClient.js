//api axiosClient.js
import axios from 'axios'
import queryString from 'query-string'


// set up default config for http request here
// please have a look at here `https://www.npmjs.com/package/axios#request-config` for full list of configs
const axiosClient = axios.create({
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
    //handle token here ...
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});

export default axiosClient;