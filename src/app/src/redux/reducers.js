import { combineReducers } from 'redux';

import AppReducer from './app.reducer';
import VisualizationsReducer from './visualizations.reducer';
import SurveyReducer from './survey.reducer';

export default combineReducers({
    app: AppReducer,
    visualizations: VisualizationsReducer,
    survey: SurveyReducer,
});
