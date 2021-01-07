const csvHeader = [
    'Geography',
    'Question Code',
    'Question Text',
    'Response Category',
    'Response Variable',
    'Gender',
    'Value',
];

const addCSVResponse = ({ question, response, data }) => {
    // This order must match the header columns
    const row = [
        response.geo,
        question.qcode,
        question.question,
        response.cat,
        response.key,
    ];

    data.push([...row, 'male', response.male]);
    data.push([...row, 'female', response.female]);
    data.push([...row, 'combined', response.combined]);
};

export const formatWaffleCSV = (item, data = []) => {
    addCSVResponse({ ...item, data });

    return data;
};

export const formatStackedCSV = (item, data = []) => {
    const { question, responses } = item;

    responses.forEach(response => {
        addCSVResponse({ question, response, data });
    });

    return data;
};

export const formatGroupedCSV = (items, data = []) => {
    items.forEach(item => {
        addCSVResponse({ ...item, data });
    });

    return data;
};

export const downloadVisualizationsCSV = categories => {
    let data = [];
    Object.keys(categories).forEach(cat => {
        categories[cat].forEach(items => {
            if (items[0].question.type === 'stack') {
                items.forEach(item => {
                    data = formatStackedCSV(item, data);
                });
            } else {
                items.forEach(item => {
                    addCSVResponse({ ...item, data });
                });
            }
        });
    });

    data.sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0));

    downloadCSV(data);
};

const createFilename = csvData => {
    let filename = '';
    csvData.forEach(row => {
        const qcode = row[1];
        if (!filename.includes(qcode)) {
            filename += `${qcode}_`;
        }
    });
    return `${filename}gender_survey.csv`;
};

// For null/false cells, numeric cells, etc. do nothing.
// For string cells, wrap cell in quotes.
const wrapStringCellInQuotes = cell =>
    !cell || !isNaN(cell) ? cell : `"${cell}"`;

export const downloadCSV = csvData => {
    const filename = createFilename(csvData);
    let csvContent =
        'data:text/csv;charset=utf-8,' +
        [csvHeader, ...csvData]
            .map(e => e.map(wrapStringCellInQuotes).join(','))
            .join('\n');

    var hiddenElement = document.createElement('a');
    hiddenElement.href = encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = filename;
    hiddenElement.click();
};
