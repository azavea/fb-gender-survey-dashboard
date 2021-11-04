import React from 'react';
import { HStack, Box, Text, Flex } from '@chakra-ui/react';
import { ResponsiveWaffleCanvas } from '@nivo/waffle';

import DownloadMenu from './DownloadMenu';
import useRefs from '../hooks/useRefs';
import { formatWaffleCSV } from '../utils/csv';

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
            <Box py={4} key={`waffle-${question.qcode}${response.geo}`}>
                <Flex justify='center' mb={2}>
                    <Text as='strong' size='sm'>
                        {response.geo} {response.year}
                    </Text>
                </Flex>
                <Box
                    p={4}
                    mx={4}
                    bg='white'
                    borderWidth='1px'
                    borderColor='gray.100'
                    borderRadius='md'
                    className='chart-container'
                    key={`waffle-${question.qcode}${response.geo}`}
                    ref={containerRefs.current[i]}
                >
                    <DownloadMenu
                        chartContainerRef={containerRefs.current[i]}
                        question={{
                            ...question,
                            geo: response.geo,
                            year: response.year,
                        }}
                        csvData={formatWaffleCSV({ question, response })}
                    />
                    <HStack
                        h={{ base: 500, md: 200 }}
                        flexDirection={{ base: 'column', md: 'row' }}
                    >
                        {responses.map(data => (
                            <ResponsiveWaffleCanvas
                                data={data}
                                key={`waffle-${question.qcode}${response.geo}${data[0].label}`}
                                pixelRatio={2}
                                colors={item => {
                                    if (item.label === 'Women') {
                                        return 'rgb(54, 17, 52)';
                                    } else if (item.label === 'Men') {
                                        return 'rgb(220, 56, 70)';
                                    } else if (item.label === 'Total') {
                                        return 'rgb(243, 164, 142)';
                                    } else {
                                        console.warning(
                                            'An unexpected item was passed to the chart.'
                                        );
                                        return 'rgb(198, 198, 198)';
                                    }
                                }}
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
                                            fontSize: 22,
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
                </Box>
            </Box>
        );
    });
};

export default WaffleChart;
