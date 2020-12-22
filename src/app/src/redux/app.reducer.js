import { createReducer } from 'redux-act';
import { merge, set } from '../utils';
import { GEO_REGION } from '../utils/constants';

import {
    setData,
    setGeoSelection,
    setGeoSelectionMode,
    setQuestionKeys,
} from './app.actions';

export const initialState = Object.freeze({
    data: {},
    geoMode: GEO_REGION,
    currentYear: 2020,
    currentGeo: [],
    currentQuestions: [],
});

export default createReducer(
    {
        [setData]: merge('data'),
        [setGeoSelection]: set('currentGeo'),
        [setGeoSelectionMode]: set('geoMode'),
        [setQuestionKeys]: set('currentQuestions'),
    },
    initialState
);
