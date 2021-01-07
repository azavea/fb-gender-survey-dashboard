import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    ButtonGroup,
    Button,
    HStack,
    Text,
    Divider,
    Flex,
    Spacer,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { IoIosCheckmark, IoIosStar, IoMdDownload } from 'react-icons/io';

import { CONFIG } from '../utils/constants';
import { DataIndexer } from '../utils';
import { downloadVisualizationsCSV } from '../utils/csv';
import { saveVisualization } from '../redux/visualizations.actions';
import Breadcrumbs from './Breadcrumbs';
import Chart from './Chart';

const Visualizations = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isSaved, setSaved] = useState(false);
    const {
        currentQuestions,
        currentGeo,
        currentYear,
        geoMode,
        data,
    } = useSelector(state => state.app);

    // Scroll to top on initial page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // If a page reloads directly to this page, restart at home
    if (!currentQuestions.length || !currentGeo.length) {
        history.push('/');
        return null;
    }

    const categorize = questionSet => {
        const questionsByCategory = { A: [], B: [], C: [], D: [] };
        questionSet.forEach(qs => {
            if (!qs[0].question) return;
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

    const onDownloadCSV = () => {
        downloadVisualizationsCSV(categories);
    };

    const onSaveVisualization = () => {
        const title = `${currentGeo.join(', ')}`;
        dispatch(
            saveVisualization({
                title,
                currentQuestions,
                currentGeo,
                currentYear,
                geoMode,
            })
        );
        setSaved(true);
    };

    const createKey = items =>
        items[0].response
            ? `${items[0].response.key}-${items[0].response.geo}`
            : `${items[0].responses[0].key}-${items[0].responses[0].geo}`;

    return (
        <Box>
            <Breadcrumbs />
            <Flex bg='white' p={4} border='1px solid rgb(222, 227, 233)'>
                <Text fontSize='2xl'>Selected Charts</Text>
                <Spacer />
                <ButtonGroup spacing='4' fontWeight='bold'>
                    <Button
                        leftIcon={<IoMdDownload />}
                        onClick={onDownloadCSV}
                        fontWeight='bold'
                    >
                        Download CSV
                    </Button>
                    {isSaved ? (
                        <Button
                            leftIcon={<IoIosCheckmark />}
                            fontWeight='bold'
                            isDisabled
                        >
                            Saved
                        </Button>
                    ) : (
                        <Button
                            leftIcon={<IoIosStar />}
                            onClick={onSaveVisualization}
                            fontWeight='bold'
                        >
                            Save
                        </Button>
                    )}
                </ButtonGroup>
            </Flex>
            <Text p={4}>
                Showing charts for: {currentGeo.join(', ')} •{' '}
                {currentQuestions.length} questions
            </Text>
            <Box>
                {Object.keys(config.categories).map(cat => {
                    const questions = categories[config.categories[cat]];
                    if (!questions.length) return null;
                    return (
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
                            {questions.map(items => (
                                <Chart items={items} key={createKey(items)} />
                            ))}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Visualizations;
