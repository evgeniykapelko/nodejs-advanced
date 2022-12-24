import axios from 'axios';
import https from 'https';
import { getKeyValue, TOKEN_DICTIONATY } from './storage.service.js';


// const getIcon = (icon) = {
//     //
// }
const getWeather = async (city) => {
    //return new Promise();
    const token = await getKeyValue(TOKEN_DICTIONATY.token);
    if (!token) {
        throw new Error('Not set API key. Please set API key -t [API_KEY');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'en',
            units: 'metric'
        }
    });

    return data;
};

export { getWeather };