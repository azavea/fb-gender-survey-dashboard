import React from 'react';
import { Box } from '@chakra-ui/react';
import { ResponsiveBarCanvas } from '@nivo/bar';
import DownloadMenu from './DownloadMenu';
import useRefs from '../hooks/useRefs';

const StackedBarChart = ({ items }) => {
    const containerRefs = useRefs(items.length);

    return items.map(({ question, responses }, i) => {
        const data = responses.reduce(
            (acc, curr) => {
                acc[0][curr.cat] = Math.round(curr.combined, 2);
                acc[1][curr.cat] = Math.round(curr.male, 2);
                acc[2][curr.cat] = Math.round(curr.female, 2);
                return acc;
            },
            [{ index: 'Total' }, { index: 'Men' }, { index: 'Women' }]
        );
        const keys = responses.map(r => r.cat);

        return (
            <Box
                h={270}
                className='chart-container'
                key={`stacked-${question.question.qcode}-${responses[0].geo}`}
                ref={containerRefs.current[i]}
                pb={10}
            >
                <DownloadMenu
                    chartContainerRef={containerRefs.current[i]}
                    question={{ ...question, geo: responses[0].geo }}
                />
                <ResponsiveBarCanvas
                    data={data}
                    keys={keys}
                    indexBy='index'
                    margin={{ top: 50, right: 250, bottom: 50, left: 60 }}
                    pixelRatio={2}
                    padding={0.15}
                    innerPadding={0}
                    minValue='auto'
                    maxValue='auto'
                    groupMode='stacked'
                    layout='horizontal'
                    colors={{ scheme: 'dark2' }}
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
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                    theme={{
                        fontSize: 14,
                        axis: {
                            legend: {
                                text: {
                                    fontSize: 14,
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
