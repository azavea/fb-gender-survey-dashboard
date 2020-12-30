import { combineReducers } from 'redux';

import AppReducer from './app.reducer';
import VisualizationsReducer from './visualizations.reducer';

export default combineReducers({
    app: AppReducer,
    visualizations: VisualizationsReducer,
});
