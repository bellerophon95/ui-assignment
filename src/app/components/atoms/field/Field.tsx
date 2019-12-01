import React from 'react';
import SelectBox from 'react-select';
// @ts-ignore
import ReactStarRatings from 'react-star-ratings';

export const FIELD_TYPES = {
    SELECT_BOX: 'SELECT_BOX',
    RATINGS: 'RATINGS',
};

// @ts-ignore
const Field = props => {
    const {type, ...restProps} = props;

    switch (type) {
        case FIELD_TYPES.RATINGS:
            return <ReactStarRatings {...restProps}/>;
        case FIELD_TYPES.SELECT_BOX:
        default:
            return <SelectBox {...restProps}/>;
    }
};

export default Field;