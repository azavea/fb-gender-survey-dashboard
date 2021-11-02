import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import StackedBarChart from './StackedBarChart';
import WaffleChart from './WaffleChart';
import GroupedBarChart from './GroupedBarChart';

const Chart = ({ items }) => {
    const { question } = items[0];

    const data = items.filter(
        item =>
            !(
                item.response?.dataUnavailable ||
                item.responses?.every(i => i.dataUnavailable)
            )
    );

    if (!data.length) return null;

    const title = question.cat ? (
        <>
            <Text
                fontSize={{ base: 'md', lg: '2xl' }}
                fontWeight={{ base: 'semibold', lg: '400' }}
            >
                {question.question}
            </Text>
            <Text as='strong' fontSize={{ base: 'md', lg: '2xl' }}>
                {question.type === 'pct' ? 'Percent who answered' : 'Answered'}:{' '}
                {question.cat}
            </Text>
        </>
    ) : (
        <Text
            fontSize={{ base: 'md', lg: '2xl' }}
            fontWeight={{ base: 'semibold', lg: '400' }}
        >
            {question.question}
        </Text>
    );

    let chart;
    if (question.type === 'stack') {
        chart = <StackedBarChart items={data} />;
    } else if (question.type === 'ten') {
        chart = <WaffleChart items={data} />;
    } else {
        chart = <GroupedBarChart items={data} />;
    }

    return (
        <Box>
            {title}
            <Box bg='gray.50' mt={2} mb={8} borderRadius='sm' overflowX='auto'>
                {chart}
            </Box>
        </Box>
    );
};

export default Chart;
