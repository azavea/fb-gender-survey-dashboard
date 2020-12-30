import { createReducer } from 'redux-act';
import produce from 'immer';
import { saveVisualization } from './visualizations.actions';

export const initialState = Object.freeze([]);

export default createReducer(
    {
        [saveVisualization]: produce((state, payload) => {
            state.push(payload);
        }),
    },
    initialState
);
