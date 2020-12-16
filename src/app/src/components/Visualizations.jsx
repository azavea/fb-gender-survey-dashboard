import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { DataIndexer } from '../utils';
const Visualizations = () => {
    const history = useHistory();
    const {
        currentQuestions,
        currentGeo,
        currentYear,
        geoMode,
        data,
    } = useSelector(state => state.app);

    // If a page reload when directly to this page, restart at home
    if (!currentQuestions.length || !currentGeo.length) {
        history.push('/');
        return null;
    }

    const dataIndexer = new DataIndexer(currentYear, geoMode, currentGeo, data);
    return (
        <Box>
            <Text>{currentQuestions}</Text>
            <Text>{currentGeo}</Text>
            <Text>
                {JSON.stringify(dataIndexer.getResponse(currentQuestions[0]))}
            </Text>
        </Box>
    );
};

export default Visualizations;
