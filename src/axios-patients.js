import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://addiction-thesis.firebaseio.com/'
});

export default instance;