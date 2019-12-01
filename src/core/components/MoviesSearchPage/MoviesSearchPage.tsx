import React, {useEffect, useState, useCallback, useMemo} from 'react';
import _filter from 'lodash/remove';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';
import {
    fetchMovies,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchNewestMovies,
    fetchGenreMovies,
    fetchMoviesByRating,
    fetchMoviesByYear
} from 'core/services/movie/movie';
import {fetchTrendingEntities} from 'core/services/entities/entities'
import {fetchGenres} from 'core/services/genre/genre';
import Navbar from 'app/components/organisms/navbar';
import SearchBar from 'app/components/molecules/searchBar';
import MovieCardSection from './MoviesCardSection';
import SidePane from 'app/components/organisms/sidePane';
import Movie from 'app/typings/Movie';
import {NAV_BAR_ITEMS, NAVBAR_VALUES} from './constants';
import './movieSearchPage.scss';

const DEFAULT_SEARCH_PAGE_TITLE = 'Discover';

const getFilteredMovies = (searchString: string, moviesList: Movie[]) => {
    if (_isEmpty(searchString)) {
        return moviesList;
    }

    const lowerCaseStr = searchString.toLowerCase();
    return _filter(moviesList, ({original_title}) => {
        return original_title.indexOf(lowerCaseStr) !== -1;
    })
};

const MoviesSearchPage = () => {
    const [searchPageTitle, setSearchPageTitle] = useState(DEFAULT_SEARCH_PAGE_TITLE);
    const [entites, setEntities] = useState();
    const [genres, setGenres] = useState();
    const [searchString, setSearchString] = useState();

    const handleNavbarAction = useCallback(action => {
        switch (action) {
            case NAVBAR_VALUES.NEWEST:
                setSearchPageTitle('Newest');
                fetchNewestMovies().then(movies => {
                    setEntities(movies);
                });
                break;
            case NAVBAR_VALUES.TOP_RATED:
                setSearchPageTitle('Top Rated');
                fetchTopRatedMovies().then(movies => {
                    setEntities(movies);
                });
                break;
            case NAVBAR_VALUES.TREND:
                setSearchPageTitle('Trend');
                fetchTrendingEntities().then(entities => {
                    setEntities(entities)
                });
                break;
            case NAVBAR_VALUES.POPULAR:
                setSearchPageTitle('Popular');
                fetchPopularMovies().then(movies => {
                    setEntities(movies);
                });
                break;
            default:
        }
    }, []);

    const filteredResults = useMemo(() => getFilteredMovies(searchString, entites), [searchString, entites]);

    const handleSearchbarAction = useCallback(searchString => {
        setSearchString(searchString);
    }, [setSearchString]);

    useEffect(() => {
        fetchMovies().then(movies => {
            setEntities(movies);
        });
        fetchGenres().then(genres => {
            setGenres(genres);
        })
    }, []);

    const handleSidePaneAction = useCallback(action => {
        switch (action.type) {
            case 'GENRE':
                fetchGenreMovies(action.value).then(movies => setEntities(movies));
                break;
            case 'RATING':
                fetchMoviesByRating(action.rating).then(movies => setEntities(movies));
                break;
            case 'FROM':
                fetchMoviesByYear(action.value).then(movies => setEntities(movies));
                break;
            case 'TO': {
                const filteredResults = _filter(entites, entity => {
                    // @ts-ignore
                    const release_date = entity.release_date;
                    return moment(release_date, "YYYY-MM-DD").format("YYYY") < release_date;
                });

                setEntities(filteredResults);
                break;
            }
            default:
        }
    }, []);

    return (
        <div className="fixed movieSearchPage w-full h-full text-white">
            <div className="flex flex-row h-full">
                <div className="flex flex-col leftSection">
                    <div className="h-20 flex flex-row m-4 p-6">
                        <div className="text-white text-4xl font-light">{searchPageTitle}</div>
                        <Navbar
                            items={NAV_BAR_ITEMS.items}
                            onAction={handleNavbarAction}
                            className="justify-center m-auto mt-6"
                            itemClassName="text-blue-400 cursor-pointer font-semibold navbarItem px-4"/>
                        <SearchBar placeholderLabel="SEARCH" onSearchBarAction={handleSearchbarAction}/>
                    </div>
                    <MovieCardSection items={entites} genres={genres}/>
                </div>
                <SidePane
                    genres={genres}
                    sidePaneTitle={`${searchPageTitle} options`}
                    className="rightSection flex-grow items-center sidePane"
                    onSidePaneAction={handleSidePaneAction}/>
            </div>
        </div>
    )
};

export default MoviesSearchPage;