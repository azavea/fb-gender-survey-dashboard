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

export const isQuestionCode = key => {
    return key.includes('.');
};

export const getAllResponsesForQ = qcode => {
    // For a given qcode (A.1), return the keys of all response types:
    // [a1_yes, a1_no]
    return Object.entries(config.survey)
        .filter(([_, q]) => q.qcode === qcode)
        .map(([key, _]) => key);
};

export const questionFromResponse = response => {
    // Strip out any attributes specific to a response. In practice, the cat
    // attribute is the only thing that makes a general question a response
    const { cat, ...rest } = response;
    return rest;
};

export class DataIndexer {
    constructor(year, geoMode, geographies, data) {
        // Index the data by the current year and geography mode
        this.data = data[year][geoMode];
        this.geographies = geographies;
        this.survey = config.survey;
    }

    // Return list of responses to a single question for current regions
    getResponse(questionKey) {
        if (isQuestionCode(questionKey)) {
            // These are question/response values for a single stacked question
            const items = getAllResponsesForQ(questionKey);
            return this.geographies.map(geo => {
                const responses = items.map(key => this.formatForViz(key, geo));
                const questionKey = responses[0].key;

                return {
                    question: questionFromResponse(this.survey[questionKey]),
                    response: responses,
                };
            });
        } else {
            // This is a single question/response entry
            return this.geographies.map(geo => {
                const responses = this.formatForViz(questionKey, geo);
                return {
                    question: this.survey[questionKey],
                    responses: responses,
                };
            });
        }
    }

    formatForViz(key, geo) {
        const resp = this.survey[key];
        const idx = resp.idx;
        const d = this.data[geo];
        const c = d['Combined'][idx];
        const m = d['Male'][idx];
        const f = d['Female'][idx];

        return {
            key: key,
            geo: geo,
            cat: resp.cat,
            combined: c,
            female: f,
            male: m,
        };
    }
}
