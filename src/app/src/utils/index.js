import produce from 'immer';
import { CONFIG } from './constants';

export const set = field =>
    produce((state, payload) => {
        state[field] = payload;
    });

export const merge = field =>
    produce((state, payload) => {
        state[field] = { ...state[field], ...payload };
    });

// Is the provided key a QuestionCode (e.g. "A.1") or a
// Response Key (e.g. "a1_other"). The heuristic is simply
// to check for a character known to distinguish the two.
export const isQuestionCode = key => {
    return key.includes('.');
};

export class DataIndexer {
    constructor(year, geoMode, geographies, data) {
        // Index the data by the current year and geography mode
        this.data = data[geoMode][year];
        this.geographies = geographies;
        this.survey = CONFIG[geoMode].survey;
    }

    // Return list of responses to a single question for current regions
    getResponse(questionKey) {
        if (isQuestionCode(questionKey)) {
            // These are question/response values for a single stacked question
            const items = this.getAllResponsesForQ(questionKey);
            return this.geographies.map(geo => {
                const responses = items.map(key => this.formatForViz(key, geo));
                const questionKey = responses[0].key;

                return {
                    question: this.questionFromResponse(
                        this.survey[questionKey]
                    ),
                    responses: responses,
                };
            });
        } else {
            // This is a single question/response entry
            return this.geographies.map(geo => {
                const response = this.formatForViz(questionKey, geo);
                return {
                    question: this.survey[questionKey],
                    response: response,
                };
            });
        }
    }

    formatForViz(key, geo) {
        const resp = this.survey[key];
        if (!resp) {
            return { key, geo };
        }
        const idx = resp.idx;
        const d = this.data.geographies[geo];
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

    getAllResponsesForQ(qcode) {
        // For a given qcode (A.1), return the keys of all response types:
        // [a1_yes, a1_no]
        return Object.entries(this.survey)
            .filter(([_, q]) => q.qcode === qcode)
            .map(([key, _]) => key);
    }

    questionFromResponse(response) {
        // Strip out any attributes specific to a response. In practice, the cat
        // attribute is the only thing that makes a general question a response
        const { cat, ...rest } = response;
        return rest;
    }
}
