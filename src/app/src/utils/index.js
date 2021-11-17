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

const isCellEmpty = value => value == null || value.length === 0;

export class DataIndexer {
    constructor(years, geoMode, geographies, data) {
        // Index the data by the current year and geography mode
        // TODO: Enable multi-year question handling
        this.year = years[0];
        this.data = data[geoMode][years[0]];
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
            return { key, geo, dataUnavailable: true };
        }

        const idx = resp.idx;
        const d = this.data.geographies[geo];
        const c = this.formatCell(d, 'Combined', idx);
        const m = this.formatCell(d, 'Male', idx);
        const f = this.formatCell(d, 'Female', idx);

        const dataUnavailable = c == null && m == null && f == null;

        return {
            key: key,
            geo: geo,
            cat: resp.cat,
            combined: c,
            female: f,
            male: m,
            year: this.year,
            dataUnavailable,
        };
    }

    formatCell(d, g, idx) {
        const cell = d[g][idx];
        return isCellEmpty(cell) ? null : cell.toFixed(2);
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

    isDataUnavailable(key) {
        // There is no data available for the question
        // for any selected geography in the current year
        return this.geographies.every(
            geo => this.formatForViz(key, geo).dataUnavailable
        );
    }

    getGeoAvailability(key) {
        // Returns an object showing the question's
        // availability for each geography
        return this.geographies.reduce(
            (acc, geo) => ({
                ...acc,
                [geo]: this.formatForViz(key, geo).dataUnavailable,
            }),
            {}
        );
    }
}

export const formatQuery = str => str?.trim().toLowerCase() || '';

export const calculateAvailableGeo = ({
    years,
    geoMode,
    currentGeo,
    data,
    survey,
}) => {
    if (!currentGeo.length) return [];
    return years.reduce((availableYears, year) => {
        const indexer = new DataIndexer([year], geoMode, currentGeo, data);
        const geoAvailability = Object.entries(survey).map(([key, question]) =>
            indexer.getGeoAvailability(key)
        );

        return {
            ...availableYears,
            [year]: currentGeo.filter(geo =>
                geoAvailability.some(ga => !ga[geo])
            ),
        };
    }, {});
};

export const formatCurrentGeo = ({
    currentGeo,
    currentYears,
    availableYearsGeography,
}) =>
    currentGeo
        .filter(geo =>
            currentYears.some(year =>
                availableYearsGeography[year].includes(geo)
            )
        )
        .join(', ');
