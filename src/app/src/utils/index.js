import produce from 'immer';
import config from '../data/config.json';

export const set = field =>
    produce((state, payload) => {
        state[field] = payload;
    });

export const merge = field =>
    produce((state, payload) => {
        state[field] = { ...state[field], ...payload };
    });

export class DataIndexer {
    constructor(year, geoMode, geographies, data) {
        // Index the data by the current year and geography mode
        this.data = data[year][geoMode];
        this.geographies = geographies;
        this.survey = config.survey;
    }

    // Return list of responses to a single question for current regions
    getResponse(questionKey) {
        return this.geographies.map(geo => {
            const idx = this.survey[questionKey].idx;
            const d = this.data[geo];
            const c = d['Combined'][idx];
            const m = d['Male'][idx];
            const f = d['Female'][idx];
            return [{ geo: geo, combined: c, female: f, male: m }];
        });
    }
}
