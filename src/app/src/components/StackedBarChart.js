import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { ResponsiveBarCanvas } from '@nivo/bar';

import DownloadMenu from './DownloadMenu';
import useRefs from '../hooks/useRefs';
import { formatStackedCSV } from '../utils/csv';

const StackedBarChart = ({ items }) => {
    const { currentYears } = useSelector(state => state.app);
    const containerRefs = useRefs(items.length);

    return items.map(({ question, responses }, i) => {
        const data = currentYears
            .map(year => {
                const validResponses = responses
                    .filter(r => r.year === year)
                    .filter(r => !r.dataUnavailable);
                return validResponses.length
                    ? validResponses.reduce(
                          (acc, curr) => {
                              acc[0][curr.cat] = Math.round(curr.combined, 2);
                              acc[1][curr.cat] = Math.round(curr.male, 2);
                              acc[2][curr.cat] = Math.round(curr.female, 2);
                              return acc;
                          },
                          [
                              { index: `Total ${year}` },
                              { index: `Men ${year}` },
                              { index: `Women ${year}` },
                          ]
                      )
                    : validResponses;
            })
            .flat();

        const keys = [
            'Strongly Agree/Agree',
            'Strongly Disagree/Disagree',
            'Neutral',
        ];
        const formatValue = v => `${v}%`;

        const height = 100 + data.length * 35;

        return (
            <Box
                h={height}
                className='chart-container'
                key={`stacked-${question.question.qcode}-${responses[0].geo}`}
                ref={containerRefs.current[i]}
                border='1px solid'
                borderColor='gray.100'
                p={1}
                bg='white'
                borderRadius='md'
                m={4}
                minW='700px'
            >
                <DownloadMenu
                    chartContainerRef={containerRefs.current[i]}
                    question={{ ...question, geo: responses[0].geo }}
                    csvData={formatStackedCSV({ question, responses })}
                />
                <ResponsiveBarCanvas
                    data={data}
                    keys={keys}
                    indexBy='index'
                    margin={{ top: 50, right: 250, bottom: 60, left: 120 }}
                    pixelRatio={2}
                    padding={0.25}
                    innerPadding={0}
                    enableGridX={true}
                    enableGridY={false}
                    minValue='auto'
                    maxValue={100}
                    groupMode='stacked'
                    layout='horizontal'
                    colors={item => {
                        if (item.id === 'Strongly Disagree/Disagree') {
                            return 'rgb(54, 17, 52)';
                        } else if (item.id === 'Neutral') {
                            return 'rgb(243, 164, 142)';
                        } else if (item.id === 'Strongly Agree/Agree') {
                            return 'rgb(220, 56, 70)';
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
                        legend: `${responses[0].geo}`,
                        legendPosition: 'middle',
                        legendOffset: -15,
                    }}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 10,
                        tickRotation: 0,
                        format: formatValue,
                        legend: 'Percent providing given response',
                        legendPosition: 'middle',
                        legendOffset: 45,
                    }}
                    tooltipFormat={formatValue}
                    theme={{
                        fontSize: 14,
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
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    width: 200,
                                },
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
    });
};

export default StackedBarChart;
