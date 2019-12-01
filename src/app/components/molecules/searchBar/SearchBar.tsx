import React, {useCallback, useState} from 'react';
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import './searchBar.scss';

interface SearchBarProps {
    placeholderLabel?: string,
    className?: string,

    onSearchBarAction(searchString: string): any,
}

export const SearchBar = (props: SearchBarProps) => {
    const {placeholderLabel, onSearchBarAction} = props;

    const handleChange = useCallback(event => {
        const inputValue = _get(event, 'target.value');
        onSearchBarAction(inputValue)
    }, [onSearchBarAction]);


    return (
        <div className="searchBar mt-6">
            <span>&#128269;</span>
            <input onChange={handleChange}
                   placeholder={placeholderLabel}
                   className="font-semibold text-blue-400"/>
        </div>)
};

SearchBar.defaultProps = {
    placeholderLabel: 'Enter Text'
};

export default SearchBar;