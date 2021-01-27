import { createAction } from 'redux-act';

export const setShowSurvey = createAction('Set show survey');
export const setSurveyHasBeenDisplayed = createAction(
    'Set survey has been displayed'
);
