import produce from 'immer';
import { CONFIG, GEO_REGION, GEO_COUNTRY } from './constants';

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
        this.years = years;
        this.data = data[geoMode];
        this.geographies = geographies;
        this.survey = CONFIG[geoMode].survey;
    }

    // Return list of responses to a single question for current regions
    getResponse(questionKey) {
        if (isQuestionCode(questionKey)) {
            // These are question/response values for a single stacked question
            const items = this.getAllResponsesForQ(questionKey);
            return this.geographies.map(geo => {
                const responses = this.years.reduce(
                    (responses, year) => [
                        ...responses,
                        ...items.map(key => this.formatForViz(key, geo, year)),
                    ],
                    []
                );
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
            return this.years.reduce(
                (responses, year) => [
                    ...responses,
                    ...this.geographies.map(geo => {
                        const response = this.formatForViz(
                            questionKey,
                            geo,
                            year
                        );
                        return {
                            question: this.survey[questionKey],
                            response: response,
                        };
                    }),
                ],
                []
            );
        }
    }

    formatForViz(key, geo, year) {
        let resp = this.survey[key];
        if (key.includes('.')) {
            // This is a Likert scale question, which use a qcode as an
            // identifier instead of a key. We can grab the question from one of
            // the response/question pairs that share the qcode.
            resp = Object.values(this.survey).find(q => q.qcode === key);
        }
        if (!resp) {
            return { key, geo, dataUnavailable: true };
        }

        const idx = resp.idx;
        const d = this.data[year].geographies[geo];
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
            year: year,
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

    isDataUnavailable(key, year) {
        // There is no data available for the question
        // for any selected geography in the current year
        return this.geographies.every(
            geo => this.formatForViz(key, geo, year).dataUnavailable
        );
    }

    getGeoAvailability(key, year) {
        // Returns an object showing the question's
        // availability for each geography
        return this.geographies.reduce(
            (acc, geo) => ({
                ...acc,
                [geo]: this.formatForViz(key, geo, year).dataUnavailable,
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
    const indexer = new DataIndexer(years, geoMode, currentGeo, data);
    return years.reduce((availableYears, year) => {
        const geoAvailability = Object.entries(survey).map(([key, question]) =>
            indexer.getGeoAvailability(key, year)
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

export const isValidGeoMode = geoMode =>
    geoMode === GEO_REGION || geoMode === GEO_COUNTRY;
