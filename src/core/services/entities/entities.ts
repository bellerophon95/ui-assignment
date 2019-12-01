import axios from '../baseConfig';
import API_KEY from '../../../apiKey';

export const fetchTrendingEntities = async () => {
    const {data} = await axios.get(`/3/trending/all/day?api_key=${API_KEY}&language=en-US&sort`);
    return data.results;
};
