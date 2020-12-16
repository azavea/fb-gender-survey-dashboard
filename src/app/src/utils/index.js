import produce from 'immer';

export const set = field =>
    produce((state, payload) => {
        state[field] = payload;
    });

export const merge = field =>
    produce((state, payload) => {
        state[field] = { ...state[field], ...payload };
    });
