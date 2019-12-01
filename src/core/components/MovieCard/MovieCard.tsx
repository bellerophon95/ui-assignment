import React, {useMemo} from 'react';
import _map from 'lodash/map';
import _compact from 'lodash/compact';
import _head from 'lodash/head';
import _some from 'lodash/some';
import Movie from 'app/typings/Movie';
import moment from 'moment';
import './movieCard.scss';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

interface Genre { //todo:Move out to common typings
    id: number,
    name: string,
}


interface MovieCardProps extends Movie {
    genres: Genre[],
}

const getGenres = (currGenreIds: number[], resolvedGenreList: Genre[]) => {
    const genreList =_map(resolvedGenreList, ({id, name}) => {
        if (_some(currGenreIds, currGenreid => currGenreid === id)) {
            return name;
        }
    });
    return _head(_compact(genreList)) || [];
};

const MovieCard = (props: MovieCardProps) => {
    const {original_title, poster_path, release_date, genre_ids, genres} = props;

    const genreList = useMemo(() => getGenres(genre_ids, genres), [genres, genre_ids]);

    return (
        <div className="mx-6 mb-12">
            <img src={`${BASE_POSTER_URL}${poster_path}`} className="posterImage"/>
            <div className="flex justify-center text-blue-400 font-semibold truncate title mt-3">{original_title}</div>
            <div className="text-gray-600 flex justify-center subtitle">
                <div className="px-1">{genreList}</div>
                <div>{moment(release_date, "DD-MM-YYYY").format("YYYY")}</div>
            </div>
        </div>)
};

export default MovieCard;