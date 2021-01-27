import { createReducer } from 'redux-act';
import { set } from '../utils';

import { setShowSurvey, setSurveyHasBeenDisplayed } from './survey.actions';

export const initialState = Object.freeze({
    showSurvey: false,
    surveyHasBeenDisplayed: false,
});

export default createReducer(
    {
        [setShowSurvey]: set('showSurvey'),
        [setSurveyHasBeenDisplayed]: set('surveyHasBeenDisplayed'),
    },
    initialState
);
