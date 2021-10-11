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
    setYears,
} from './app.actions';

export const initialState = Object.freeze({
    data: {},
    geoMode: GEO_COUNTRY,
    currentYears: [],
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
            state.currentYears = payload.currentYears;
            state.currentGeo = payload.currentGeo;
            state.currentQuestions = payload.currentQuestions;
        }),
        [setYears]: set('currentYears'),
    },
    initialState
);
