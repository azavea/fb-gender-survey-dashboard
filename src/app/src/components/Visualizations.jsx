import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    AccordionButton,
    Box,
    ButtonGroup,
    useMediaQuery,
    Button,
    Heading,
    Text,
    Flex,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { IoIosCheckmark, IoIosStar, IoMdDownload } from 'react-icons/io';

import { CONFIG, ROUTES } from '../utils/constants';
import { DataIndexer, calculateAvailableGeo, formatCurrentGeo } from '../utils';
import { downloadVisualizationsCSV } from '../utils/csv';
import { saveVisualization } from '../redux/visualizations.actions';
import { setShowSurvey } from '../redux/survey.actions';
import Breadcrumbs from './Breadcrumbs';
import Chart from './Chart';

const Visualizations = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isSaved, setSaved] = useState(false);
    const {
        currentQuestions,
        currentGeo,
        currentYears,
        geoMode,
        data,
    } = useSelector(state => state.app);
    const { surveyHasBeenDisplayed, showSurvey } = useSelector(
        state => state.survey
    );

    // Show or hide the breadcrumbs if small screen
    const [isSmallScreen] = useMediaQuery('(max-width: 30em)');

    // Scroll to top on initial page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!surveyHasBeenDisplayed && !showSurvey) {
            setTimeout(() => dispatch(setShowSurvey(true)), 30000);
        }
    }, [showSurvey, surveyHasBeenDisplayed, dispatch]);

    const config = CONFIG[geoMode];
    // Select the appropriate config file based on the current geoMode
    const survey = config?.survey;
    const years = useMemo(
        () => (geoMode && data[geoMode] ? Object.keys(data[geoMode]) : []),
        [geoMode, data]
    );

    // Select the available years based on available questions for selected geographies
    const availableYearsGeography = useMemo(
        () =>
            calculateAvailableGeo({ years, geoMode, currentGeo, data, survey }),
        [years, geoMode, currentGeo, data, survey]
    );

    // If a page reloads directly to this page, restart at home
    if (
        !currentQuestions.length ||
        !currentGeo.length ||
        !currentYears.length
    ) {
        history.push(ROUTES.HOME);
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

    const dataIndexer = new DataIndexer(
        currentYears,
        geoMode,
        currentGeo,
        data
    );
    const viz = currentQuestions.map(q => dataIndexer.getResponse(q));
    const categories = categorize(viz);

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
                currentYears,
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
            {!isSmallScreen && <Breadcrumbs />}
            <Flex layerStyle='selector'>
                <Flex>
                    <Heading as='h2' textStyle='h2' mb='0'>
                        Selected Charts
                    </Heading>
                    <ButtonGroup
                        flexDirection={{ base: 'column', sm: 'row' }}
                        spacing={{ base: 0, sm: 4 }}
                        fontWeight='bold'
                    >
                        <Button
                            leftIcon={<IoMdDownload size={20} />}
                            size='sm'
                            fontWeight='bold'
                            onClick={onDownloadCSV}
                        >
                            Download CSV
                        </Button>
                        {isSaved ? (
                            <Box
                                color='green.700'
                                borderRadius='sm'
                                bg='gray.50'
                                fontWeight='bold'
                                width={{ base: '100%', sm: '87px' }}
                                py={0}
                                mt={{ base: 2, sm: 0 }}
                                display='flex'
                                alignItems='center'
                                textTransform='uppercase'
                                letterSpacing='1px'
                                fontSize='sm'
                            >
                                <IoIosCheckmark size={25} />
                                Saved
                            </Box>
                        ) : (
                            <Button
                                leftIcon={<IoIosStar size={20} />}
                                width='88px'
                                fontWeight='bold'
                                variant='peach'
                                size='sm'
                                onClick={onSaveVisualization}
                            >
                                Save
                            </Button>
                        )}
                    </ButtonGroup>
                </Flex>
            </Flex>
            <Flex
                my={2}
                mx={{ base: 4, md: 4, lg: 8, xl: 'auto' }}
                maxW='1200px'
            >
                <Text size='2xl' fontWeight='bold'>
                    Showing charts for: {currentYears.join(', ')}
                    <Box as='span' opacity='0.5' mx={1}>
                        •
                    </Box>
                    {formatCurrentGeo({
                        currentGeo,
                        currentYears,
                        availableYearsGeography,
                    })}
                    <Box as='span' opacity='0.5' mx={1}>
                        •
                    </Box>
                    {currentQuestions.length} questions
                </Text>
            </Flex>
            <Flex
                direction='column'
                maxW='1200px'
                mt={8}
                mx={{ base: 4, md: 4, lg: 'auto' }}
            >
                <Accordion defaultIndex={[0, 1, 2, 3, 4]} allowMultiple>
                    {Object.keys(config.categories).map(cat => {
                        const questions = categories[config.categories[cat]];
                        if (!questions.length) return null;
                        return (
                            <AccordionItem key={cat}>
                                <AccordionButton
                                    alignItems='center'
                                    justifyContent='space-between'
                                    p={3}
                                >
                                    <Heading
                                        as='h3'
                                        size='md'
                                        fontWeight='normal'
                                    >
                                        {cat}
                                    </Heading>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel
                                    borderTop='2px solid'
                                    borderColor='gray.50'
                                >
                                    {questions.map(items => (
                                        <Chart
                                            items={items}
                                            key={createKey(items)}
                                        />
                                    ))}
                                </AccordionPanel>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Flex>
        </Box>
    );
};

export default Visualizations;
