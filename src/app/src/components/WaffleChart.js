import React from 'react';
import { HStack, Box, Text, Flex } from '@chakra-ui/react';
import { ResponsiveWaffleCanvas } from '@nivo/waffle';

import DownloadMenu from './DownloadMenu';
import useRefs from '../hooks/useRefs';

const WaffleChart = ({ items }) => {
    const containerRefs = useRefs(items.length);

    return items.map(({ question, response }, i) => {
        const responses = [
            [
                {
                    id: `Women: ${response.female}`,
                    label: 'Women',
                    value: response.female,
                },
            ],
            [
                {
                    id: `Men: ${response.male}`,
                    label: 'Men',
                    value: response.male,
                },
            ],
            [
                {
                    id: `Total: ${response.combined}`,
                    label: 'Total',
                    value: response.combined,
                },
            ],
        ];
        return (
            <Box
                mt={4}
                pt={4}
                pb={4}
                borderWidth='1px'
                borderRadius='lg'
                className='chart-container'
                key={`${question.qcode}${response.geo}`}
                ref={containerRefs.current[i]}
            >
                <DownloadMenu
                    chartContainerRef={containerRefs.current[i]}
                    question={{ ...question, geo: response.geo }}
                />
                <HStack h={200}>
                    {responses.map(data => (
                        <ResponsiveWaffleCanvas
                            data={data}
                            pixelRatio={2}
                            total={10}
                            rows={2}
                            columns={5}
                            padding={5}
                            margin={{
                                top: 50,
                                right: 10,
                                bottom: 10,
                                left: 10,
                            }}
                            theme={{
                                fontSize: 14,
                                legends: {
                                    text: {
                                        fontSize: 30,
                                        width: 200,
                                    },
                                },
                            }}
                            legends={[
                                {
                                    anchor: 'top',
                                    data: [
                                        {
                                            id: 'Total',
                                            label: 'Total',
                                            value: response.combined,
                                        },
                                    ],
                                    direction: 'column',
                                    justify: false,
                                    translateX: 0,
                                    translateY: -30,
                                    itemsSpacing: 4,
                                    itemWidth: 100,
                                    itemHeight: 20,
                                    itemDirection: 'bottom-to-top',
                                    itemOpacity: 1,
                                    itemTextColor: '#000',
                                    symbolSize: 0,
                                },
                            ]}
                        />
                    ))}
                </HStack>
                <Flex justify='center'>
                    <Text as='strong' size='sm'>
                        {response.geo}
                    </Text>
                </Flex>
            </Box>
        );
    });
};

export default WaffleChart;
