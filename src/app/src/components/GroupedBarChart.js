import React, { useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { ResponsiveBarCanvas } from '@nivo/bar';

import DownloadMenu from './DownloadMenu';

const GroupedBarChart = ({ items }) => {
    const data = items.map(({ response }) => ({
        ...response,
        Men: response.male,
        Women: response.female,
        Total: response.combined,
    }));
    const keys = ['Total', 'Men', 'Women'];

    const { cat, qcode } = items[0].question;
    const legend = cat ? `Answered "${cat}" to ${qcode}` : `Answered ${qcode}`;

    const containerRef = useRef();

    return (
        <Box className='chart-container' h={250} ref={containerRef}>
            <DownloadMenu
                chartContainerRef={containerRef}
                question={items[0].question}
            />
            <ResponsiveBarCanvas
                data={data}
                keys={keys}
                indexBy='geo'
                margin={{ top: 50, right: 150, bottom: 50, left: 200 }}
                pixelRatio={2}
                padding={0.15}
                innerPadding={0}
                minValue='auto'
                maxValue='auto'
                groupMode='grouped'
                layout='horizontal'
                colors={{ scheme: 'set1' }}
                axisTop={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: () => '',
                    legend,
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
};

export default GroupedBarChart;
