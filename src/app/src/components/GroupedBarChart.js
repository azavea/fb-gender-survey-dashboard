import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { ResponsiveBarCanvas } from '@nivo/bar';
import sortBy from 'lodash/sortBy';
import flatMap from 'lodash/flatMap';

import DownloadMenu from './DownloadMenu';
import { formatGroupedCSV } from '../utils/csv';

const formatResponsesForChart = ({ items, sortedYears }) => {
    let data = sortedYears
        .map(year => {
            return items
                .filter(
                    ({ response }) =>
                        response.year === year && !response.dataUnavailable
                )
                .map(({ response }) => ({
                    ...response,
                    geoyear: `${response.geo} ${response.year}`,
                    Men: response.male,
                    Women: response.female,
                    Total: response.combined,
                }))
                .reverse();
        })
        .filter(yearData => yearData.length);

    return flatMap(data, (yearData, index, array) =>
        array.length - 1 !== index ? [yearData, { geoyear: '' }] : yearData
    ).flat();
};

const getMaxValue = type => {
    if (type === 'pct') return 100;

    if (type === 'ten') return 10;

    return 'auto';
};

const GroupedBarChart = ({ items }) => {
    const { currentYears } = useSelector(state => state.app);
    const sortedYears = sortBy(currentYears, year => parseInt(year)).reverse();

    const data = formatResponsesForChart({ items, sortedYears });

    const keys = ['Total', 'Men', 'Women'];

    const { cat, qcode, type } = items[0].question;
    const isPercent = type === 'pct';
    const formatValue = v =>
        isPercent ? `${v}%` : parseFloat(v).toLocaleString();

    let legend = `Answered ${qcode}`;

    if (cat) {
        legend = isPercent
            ? `Percent who answered "${cat}" to ${qcode}`
            : `Answered "${cat}" to ${qcode}`;
    } else {
        legend = isPercent
            ? `Percent who answered ${qcode}`
            : `Answered ${qcode}`;
    }

    const axisBottom = isPercent
        ? {
              tickSize: 0,
              tickPadding: 10,
              tickRotation: 0,
              format: formatValue,
              legend: 'Percent providing given response',
              legendPosition: 'middle',
              legendOffset: 50,
          }
        : {
              tickSize: 0,
              tickPadding: 10,
              tickRotation: 0,
              format: formatValue,
          };

    const containerRef = useRef();

    const height = 150 + data.length * 50;
    const maxValue = getMaxValue(type);

    return (
        <Box
            className='chart-container'
            ref={containerRef}
            border='1px solid'
            borderColor='gray.100'
            p={1}
            bg='white'
            borderRadius='md'
            m={4}
            height={height}
            minW='700px'
        >
            <DownloadMenu
                chartContainerRef={containerRef}
                question={items[0].question}
                csvData={formatGroupedCSV(items)}
            />
            <ResponsiveBarCanvas
                data={data}
                keys={keys}
                indexBy='geoyear'
                margin={{
                    top: 50,
                    right: 110,
                    bottom: isPercent ? 60 : 50,
                    left: 230,
                }}
                pixelRatio={2}
                padding={0.15}
                innerPadding={0}
                enableGridX={true}
                enableGridY={false}
                minValue='auto'
                maxValue={maxValue}
                groupMode='grouped'
                layout='horizontal'
                colors={item => {
                    if (item.id === 'Women') {
                        return 'rgb(54, 17, 52)';
                    } else if (item.id === 'Men') {
                        return 'rgb(220, 56, 70)';
                    } else if (item.id === 'Total') {
                        return 'rgb(243, 164, 142)';
                    } else {
                        console.warning(
                            'An unexpected item was passed to the chart.'
                        );
                        return 'rgb(198, 198, 198)';
                    }
                }}
                axisTop={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: () => '',
                    legend,
                    legendPosition: 'middle',
                    legendOffset: -15,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                axisBottom={axisBottom}
                tooltipFormat={formatValue}
                theme={{
                    fontSize: 16,
                    background: 'white',
                    axis: {
                        domain: {
                            line: {
                                stroke: '#d9d9d9',
                                strokeWidth: 1,
                            },
                        },
                        legend: {
                            text: {
                                fontSize: 14,
                                fontWeight: 'bold',
                                width: 200,
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: '#000000',
                        },
                    },
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'top-right',
                        direction: 'column',
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        symbolSize: 20,
                    },
                ]}
            />
        </Box>
    );
};

export default GroupedBarChart;
