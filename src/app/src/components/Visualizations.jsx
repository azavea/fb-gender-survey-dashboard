import React from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Button,
    HStack,
    Text,
    Divider,
    Flex,
    Spacer,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { CONFIG } from '../utils/constants';
import { DataIndexer } from '../utils';
import Breadcrumbs from './Breadcrumbs';
import Chart from './Chart';

const Visualizations = () => {
    const history = useHistory();
    const {
        currentQuestions,
        currentGeo,
        currentYear,
        geoMode,
        data,
    } = useSelector(state => state.app);

    // If a page reloads directly to this page, restart at home
    if (!currentQuestions.length || !currentGeo.length) {
        history.push('/');
        return null;
    }

    const categorize = questionSet => {
        const questionsByCategory = { A: [], B: [], C: [], D: [] };
        questionSet.forEach(qs => {
            // All responses in a questionset are in the same category. Take the
            // first, and map it to a category key
            const key = qs[0].question.qcode[0].toUpperCase();
            questionsByCategory[key].push(qs);
        });

        // Filter out empty cats
        // Swap out names for cat codes
        return questionsByCategory;
    };

    const dataIndexer = new DataIndexer(currentYear, geoMode, currentGeo, data);
    const viz = currentQuestions.map(q => dataIndexer.getResponse(q));
    const categories = categorize(viz);

    const config = CONFIG[geoMode];

    return (
        <Box>
            <Breadcrumbs />
            <Flex bg='white' p={4} border='1px solid rgb(222, 227, 233)'>
                <Text fontSize='2xl'>Selected Charts</Text>
                <Spacer />
                <Button>Save</Button>
            </Flex>
            <Text p={4}>
                Showing charts for: {currentGeo.join(', ')} •{' '}
                {currentQuestions.length} questions
            </Text>
            <Box>
                {Object.keys(config.categories).map(cat => (
                    <Box key={cat}>
                        <HStack
                            align='center'
                            justify='center'
                            spacing={2}
                            p={4}
                        >
                            <Text casing='uppercase' whiteSpace='nowrap'>
                                {cat}
                            </Text>
                            <Divider />
                        </HStack>
                        {categories[config.categories[cat]].map(items => (
                            <Chart
                                items={items}
                                key={items[0].question.qcode}
                            />
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Visualizations;
