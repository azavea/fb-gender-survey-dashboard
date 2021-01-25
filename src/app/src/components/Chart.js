import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import StackedBarChart from './StackedBarChart';
import WaffleChart from './WaffleChart';
import GroupedBarChart from './GroupedBarChart';

const Chart = ({ items }) => {
    const { question } = items[0];

    const title = question.cat ? (
        <>
            <Text fontSize='2xl'>{question.question}</Text>
            <Text as='strong' fontSize='2xl'>
                {question.type === 'pct' ? 'Percent who answered' : 'Answered'}:{' '}
                {question.cat}
            </Text>
        </>
    ) : (
        <Text fontSize='2xl'>{question.question}</Text>
    );

    let chart;
    if (question.type === 'stack') {
        chart = <StackedBarChart items={items} />;
    } else if (question.type === 'ten') {
        chart = <WaffleChart items={items} />;
    } else {
        chart = <GroupedBarChart items={items} />;
    }

    return (
        <Box>
            {title}
            <Box bg='gray.50' mt={2} mb={8} borderRadius='sm' overflow='hidden'>
                {chart}
            </Box>
        </Box>
    );
};

export default Chart;
