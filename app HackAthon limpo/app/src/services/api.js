import axios from 'axios';

export default api = axios.create({
    baseURL: 'http://4.228.107.91'
});

export const ean = axios.create({
    baseURL: 'http://www.eanpictures.com.br:9000/api/'
});
