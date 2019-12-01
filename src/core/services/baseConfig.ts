import axios from 'axios';
import API_KEY from '../../apiKey';

export default axios.create({
    baseURL: 'https://api.themoviedb.org',
    timeout: 2000,
});