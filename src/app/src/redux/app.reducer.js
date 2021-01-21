import { createReducer } from 'redux-act';
import produce from 'immer';
import { merge, set } from '../utils';
import { GEO_COUNTRY } from '../utils/constants';

import {
    setData,
    setGeoSelection,
    setGeoSelectionMode,
    setQuestionKeys,
    setVisualization,
} from './app.actions';

export const initialState = Object.freeze({
    data: {},
    geoMode: GEO_COUNTRY,
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
        [setVisualization]: produce((state, payload) => {
            state.geoMode = payload.geoMode;
            state.currentYear = payload.currentYear;
            state.currentGeo = payload.currentGeo;
            state.currentQuestions = payload.currentQuestions;
        }),
    },
    initialState
);
