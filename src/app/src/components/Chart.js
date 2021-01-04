import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import StackedBarChart from './StackedBarChart';
import WaffleChart from './WaffleChart';
import GroupedBarChart from './GroupedBarChart';

const Chart = ({ items }) => {
    const { question } = items[0];

    const title = question.cat ? (
        <>
            <Text as='strong' fontSize='2xl'>
                {question.cat}
            </Text>
            <Text fontSize='2xl'>(Answer to: {question.question})</Text>
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
        <Box p={4}>
            {title}
            {chart}
        </Box>
    );
};

export default Chart;
