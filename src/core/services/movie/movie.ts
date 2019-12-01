import axios from '../baseConfig';
import API_KEY from '../../../apiKey';

export const fetchMovies = async () => {
    const {data} = await axios.get(`/3/discover/movie?api_key=${API_KEY}&language=en-US&sort`);
    return data.results;
};

export const fetchPopularMovies = async () => {
    const {data} = await axios.get(`/3/movie/popular?api_key=${API_KEY}&language=en-US&sort`);
    return data.results;
};

export const fetchTopRatedMovies = async () => {
    const {data} = await axios.get(`/3/movie/top_rated?api_key=${API_KEY}&language=en-US&sort`);
    return data.results;
};

export const fetchNewestMovies = async () => {
    const {data} = await axios.get(`/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc`);
    return data.results;
};

// @ts-ignore
export const fetchGenreMovies = async genre => {
    const {data} = await axios.get(`/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genre}`);
    return data.results;
};

// @ts-ignore
export const fetchMoviesByRating = async rating => {
    const {data} = await axios.get(`/3/discover/movie?api_key=${API_KEY}&language=en-US&vote_average.gte=${rating}`);
    return data.results;
};

// @ts-ignore
export const fetchMoviesByYear = async year=> {
    const {data} = await axios.get(`/3/discover/movie?api_key=${API_KEY}&language=en-US&year=${year}`);
    return data.results;
};