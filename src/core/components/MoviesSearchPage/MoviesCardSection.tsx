import React from 'react';
import _map from 'lodash/map';
import Movie from 'app/typings/Movie';
import MovieCard from '../MovieCard';

interface Genre { //todo:Move out to common typings
    id: number,
    name:string,
}

interface MoviesCardSectionProps {
    items: Movie[],
    genres: Genre[],
}

const MoviesCardSection = (props: MoviesCardSectionProps) => {
    const {items, genres} = props;
    return <div className="overflow-y-scroll pl-10 flex flex-wrap">
        {_map(items, (item, key) => {
            return <MovieCard key={key}{...item} genres={genres}/>
        })}
    </div>
};

export default MoviesCardSection;