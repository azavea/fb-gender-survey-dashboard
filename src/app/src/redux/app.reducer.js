import { createReducer } from 'redux-act';
import { set } from '../utils';
import { GEO_MODES } from '../utils/constants';

import {
    setData,
    setGeoSelection,
    setGeoSelectionMode,
    setQuestionKeys,
} from './app.actions';

export const initialState = Object.freeze({
    data: null,
    geoMode: GEO_MODES[0],
    currentYear: 2020,
    currentGeo: [],
    currentQuestions: [],
});

export default createReducer(
    {
        [setData]: set('data'),
        [setGeoSelection]: set('currentGeo'),
        [setGeoSelectionMode]: set('geoMode'),
        [setQuestionKeys]: set('currentQuestions'),
    },
    initialState
);
