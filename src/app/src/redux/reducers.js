import { combineReducers } from 'redux';

import AppReducer from './app.reducer';

export default combineReducers({
    app: AppReducer,
});
