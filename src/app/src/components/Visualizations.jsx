import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { DataIndexer } from '../utils';
import Breadcrumbs from './Breadcrumbs';

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

    console.log(categories);
    return (
        <Box>
            <Breadcrumbs />
            <HStack>
                <Text>Select Questions</Text>
                <Button>Save</Button>
            </HStack>
            <Box>
                <Text>{JSON.stringify(categories, null, 2)}</Text>
            </Box>
        </Box>
    );
};

export default Visualizations;
