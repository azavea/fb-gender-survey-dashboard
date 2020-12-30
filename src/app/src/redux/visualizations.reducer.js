import { createReducer } from 'redux-act';
import produce from 'immer';
import {
    saveVisualization,
    renameVisualization,
    deleteVisualization,
} from './visualizations.actions';

export const initialState = Object.freeze([]);

export default createReducer(
    {
        [saveVisualization]: produce((state, payload) => {
            state.push(payload);
        }),
        [renameVisualization]: produce((state, payload) => {
            state[payload.index].title = payload.title;
        }),
        [deleteVisualization]: produce((state, payload) => {
            state.splice(payload, 1);
        }),
    },
    initialState
);
