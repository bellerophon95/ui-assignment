import axios from '../baseConfig';
import API_KEY from '../../../apiKey';

export const fetchGenres = async () => {
    const {data} = await axios.get(`/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    return data.genres;
};