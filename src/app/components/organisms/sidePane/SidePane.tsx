import React, {useCallback, useState, useMemo} from 'react';
import _map from 'lodash/map';
import _range from 'lodash/range';
import _get from 'lodash/get';
import Field, {FIELD_TYPES} from 'app/components/atoms/field';

interface Genre { //todo:Move out to common typings
    id: number,
    name: string,
}

const YEARS = _range(1980, 2019).map(year => ({label: year, value: year}));

interface SidePaneProps {
    onSidePaneAction(event: Event): any,

    sidePaneTitle: string,
    className?: string,
    genres: Genre[],
}

const adaptGenres = (genres: Genre[]) => _map(genres, ({id, name}) =>
    ({
        value: id,
        label: name,
    }));

const SidePane = (props: SidePaneProps) => {
    const {sidePaneTitle, className, genres, onSidePaneAction} = props;

    const [rating, setRating] = useState(0);

    const handleChangeRating = useCallback(rating => {
        setRating(rating);
        // @ts-ignore
        onSidePaneAction({type: 'RATING', rating})
    }, []);

    const adaptedGenres = useMemo(() => adaptGenres(genres), [genres]);

    const handleSidePaneAction = useCallback(action => {
        onSidePaneAction(action);
    }, []);

    const handleTypeSelectAction = useCallback(action => {
        handleSidePaneAction({type: 'TYPE', ...action})
    }, []);

    const handleGenreSelectAction = useCallback(action => {
        handleSidePaneAction({type: 'GENRE', ...action})
    }, []);

    const handleFromSelectAction = useCallback(action => {
        handleSidePaneAction({type: 'FROM', ...action})
    }, []);

    const handleToSelectAction = useCallback(action => {
        handleSidePaneAction({type: 'TO', ...action})
    }, []);


    return (
        <div className={`flex flex-col ${className}`}>
            <div className="mt-6">
                <div className="text-white">{sidePaneTitle}</div>
                <div>
                    <div className="text-gray-600 mt-2">{'Type'}</div>
                    <Field
                        data-actionid="typeSelectBox"
                        onChange={handleTypeSelectAction}
                        type={FIELD_TYPES.SELECT_BOX}
                        className="mt-2"
                    />
                    <div className="text-gray-600 mt-2">{'Genre'}</div>
                    <Field
                        type={FIELD_TYPES.SELECT_BOX}
                        data-actionid="genreSelectBox"
                        onChange={handleGenreSelectAction}
                        className="mt-2"
                        options={adaptedGenres}
                    />
                    <div className="text-gray-600 mt-2">{'Year'}</div>
                    <Field
                        type={FIELD_TYPES.SELECT_BOX}
                        className="mt-2"
                        options={YEARS}
                        onChange={handleFromSelectAction}
                    />
                    <Field
                        className="mt-2"
                        type={FIELD_TYPES.SELECT_BOX}
                        options={YEARS}
                        onChange={handleToSelectAction}
                    />
                </div>
                <Field type={FIELD_TYPES.RATINGS}
                       rating={rating}
                       starHoverColor="#f8c31c"
                       starRatedColor="#f8c31c"
                       starDimension="20px"
                       starSpacing="2px"
                       changeRating={handleChangeRating}
                />
            </div>
        </div>
    )
};

export default SidePane;