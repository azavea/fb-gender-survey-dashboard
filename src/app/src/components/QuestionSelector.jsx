import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    AccordionButton,
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Text,
    useMediaQuery,
    Heading,
    VStack,
    Flex,
} from '@chakra-ui/react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IconContext } from 'react-icons';

import { setQuestionKeys } from '../redux/app.actions';
import { CONFIG, ROUTES } from '../utils/constants';
import {
    formatQuery,
    DataIndexer,
    calculateAvailableGeo,
    formatCurrentGeo,
} from '../utils';
import Breadcrumbs from './Breadcrumbs';
import SearchInput from './SearchInput';

const QuestionSelector = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const {
        currentGeo,
        currentQuestions,
        geoMode,
        currentYears,
        data,
    } = useSelector(state => state.app);

    // Show or hide the breadcrumbs if small screen
    const [isSmallScreen] = useMediaQuery('(max-width: 30em)');

    // Select the appropriate config file based on the current geoMode
    const config = CONFIG[geoMode];

    // Select the appropriate config file based on the current geoMode
    const survey = config?.survey;
    const years = useMemo(
        () => (geoMode && data[geoMode] ? Object.keys(data[geoMode]) : []),
        [geoMode, data]
    );

    // Determine the indexes of any categories that currently have questions
    // selected. These will be expanded by default.
    const categoryLetterCodes = Object.values(config.categories);
    const currentlySelectedCategories = new Set(
        currentQuestions.map(q => q[0].toUpperCase())
    );
    const currentlySelectedCategoryIndexes = Array.from(
        currentlySelectedCategories
    ).map(catCode => categoryLetterCodes.indexOf(catCode));

    const [expandedCategoryIndexes, setExpandedCategoryIndexes] = useState(
        currentlySelectedCategoryIndexes
    );

    const dataIndexer = useMemo(() => {
        if (!currentGeo.length || !currentYears.length) return null;
        return new DataIndexer(currentYears, geoMode, currentGeo, data);
    }, [currentYears, geoMode, currentGeo, data]);

    // Select the available years based on available questions for selected geographies
    const availableYearsGeography = useMemo(
        () =>
            calculateAvailableGeo({ years, geoMode, currentGeo, data, survey }),
        [years, geoMode, currentGeo, data, survey]
    );

    // Known categories
    const questionsByCategory = { A: [], B: [], C: [], D: [] };

    const getCategoryData = query =>
        Object.keys(config.categories).map(cat => {
            const catCode = config.categories[cat];
            const questionCodes = questionsByCategory[catCode];

            const filteredQuestionCodes = query.trim().length
                ? questionCodes.filter(q => {
                      if (currentQuestions.includes(q)) return true;

                      const item = config.survey[q];

                      // if the item isn't found,
                      // we need to look at items that match the qcode
                      if (!item) {
                          const items = Object.keys(config.survey)
                              .map(key => config.survey[key])
                              .filter(question => question.qcode === q);
                          return items.some(question =>
                              formatQuery(
                                  `${question.question} ${question.cat}`
                              ).includes(formatQuery(query))
                          );
                      } else {
                          return formatQuery(
                              `${item.question} ${item.cat}`
                          ).includes(formatQuery(query));
                      }
                  })
                : questionCodes;
            return { cat, catCode, questionCodes, filteredQuestionCodes };
        });

    const handleSetQuery = text => {
        setQuery(text);
        if (text.trim().length) {
            const additionalItems = getCategoryData(text)
                .filter(
                    ({ filteredQuestionCodes, catCode }) =>
                        filteredQuestionCodes.length &&
                        !expandedCategoryIndexes.includes(
                            categoryLetterCodes.indexOf(catCode)
                        )
                )
                .map(({ catCode }) => categoryLetterCodes.indexOf(catCode));

            setExpandedCategoryIndexes([
                ...expandedCategoryIndexes,
                ...additionalItems,
            ]);
        }
    };

    // If a page reloads directly to this page, restart at home
    if (!currentGeo.length || !currentYears.length) {
        history.push('/');
        return null;
    }

    const handleQuestionSelect = selected => {
        let newSelections = selected;

        if (selected.length > currentQuestions.length) {
            // We added a qcode - find added qcode
            const newQcode = selected.find(
                qcode => !currentQuestions.includes(qcode)
            );

            // If adding a category code, add all questions for category
            if (Object.keys(questionsByCategory).includes(newQcode)) {
                newSelections = [
                    ...selected,
                    ...questionsByCategory[newQcode].filter(
                        qcode => !selected.includes(qcode)
                    ),
                ];
            }
        } else {
            // We removed a qcode - find removed qcode
            const removedQcode = currentQuestions.find(
                qcode => !selected.includes(qcode)
            );

            // If removing a category code, remove all questions for category
            if (Object.keys(questionsByCategory).includes(removedQcode)) {
                newSelections = selected.filter(
                    qcode => !questionsByCategory[removedQcode].includes(qcode)
                );
            }
        }

        // When using a checkbox group, the prop 'isChecked' is overridden
        // by the value passed to the group. Therefore, we must manually
        // add the category code to the current questions if all the questions
        // in that category are selected, and deselect in the opposite case.
        Object.keys(questionsByCategory).forEach(catCode => {
            const allChildrenChecked = questionsByCategory[
                catCode
            ].every(qcode => newSelections.includes(qcode));
            if (allChildrenChecked && !newSelections.includes(catCode)) {
                newSelections.push(catCode);
            } else if (!allChildrenChecked && newSelections.includes(catCode)) {
                newSelections = newSelections.filter(
                    qcode => qcode !== catCode
                );
            }
        });

        dispatch(setQuestionKeys(newSelections));
    };

    const handleNext = () => {
        history.push(ROUTES.VISUALIZATIONS);
    };

    Object.entries(config.survey)
        .filter(([key, question]) =>
            currentYears.some(year => !dataIndexer.isDataUnavailable(key, year))
        )
        .forEach(([key, question]) => {
            const categoryCode = question.qcode[0].toUpperCase();

            // Stack questions need to be grouped (agree/neutral/disagree) and
            // only have the *question code* added once.
            if (
                question.type === 'stack' &&
                !questionsByCategory[categoryCode].includes(question.qcode)
            ) {
                questionsByCategory[categoryCode].push(question.qcode);

                // Other types are directly about the respose, so we use the question/resoponse key
                // and not the question code. We'll need to be aware of this mixed content when
                // parsing questionsByCategory later.
            } else if (question.type !== 'stack') {
                questionsByCategory[categoryCode].push(key);
            }
        });

    const getQuestionCheckboxLabel = key => {
        // Generate a checkbox for a question. The checkbox text will differ
        // depending on the type of question this is. Questions that are of type
        // "stack" will not include response text in the text, nor will the
        // "ten" type. Other types repeat the question but are distinguished by
        // also including the response text.

        // Handle non likert scale questions
        if (!key.includes('.')) {
            const item = config.survey[key];
            if (item.cat) {
                return (
                    <Box fontWeight='400'>
                        <Text fontSize='inherit'>{item.question}</Text>
                        <Text
                            fontSize='inherit'
                            fontWeight='bold'
                        >{`Answered: ${item.cat}`}</Text>
                    </Box>
                );
            }

            return (
                <Box fontWeight='regular'>
                    <Text fontSize='inherit'>{item.question}</Text>
                </Box>
            );
        }

        // Likert scale questions ignore the category rendering, and we can grab
        // the question from any of the respones/question paris that share the
        // qcode.
        const item = Object.values(config.survey).find(q => q.qcode === key);
        return item.question;
    };

    const categories = getCategoryData(query).map(
        ({ cat, catCode, questionCodes, filteredQuestionCodes }) => {
            const questions = filteredQuestionCodes.map(q => {
                return (
                    <Checkbox
                        key={q}
                        value={q}
                        size='lg'
                        colorScheme='red'
                        alignItems='flex-start'
                    >
                        {getQuestionCheckboxLabel(q)}
                    </Checkbox>
                );
            });

            const allChecked = questionCodes.every(qcode =>
                currentQuestions.includes(qcode)
            );
            const isIndeterminate =
                questionCodes.some(qcode => currentQuestions.includes(qcode)) &&
                !allChecked;

            return (
                <AccordionItem key={`qgroup-${catCode}`}>
                    {({ isExpanded }) => (
                        <>
                            <AccordionButton
                                alignItems={{
                                    base: 'center',
                                    md: 'flex-start',
                                }}
                                p={{ base: 1, sm: 3 }}
                            >
                                <Checkbox
                                    p={2}
                                    mr={{ base: 1, sm: 2 }}
                                    value={catCode}
                                    isIndeterminate={isIndeterminate}
                                    isDisabled={!questions.length && true}
                                />
                                <Box flex='1' py={1}>
                                    <Heading
                                        textAlign='left'
                                        fontSize={{ base: 'lg', md: '2xl' }}
                                        fontWeight={{
                                            base: 'semibold',
                                            md: '400',
                                        }}
                                        as='h3'
                                    >
                                        {cat}
                                    </Heading>
                                    {!questions.length <= 0 && !isExpanded && (
                                        <Heading
                                            textAlign='left'
                                            fontSize={{ base: 'sm', sm: 'md' }}
                                            color='gray.500'
                                            fontWeight='semibold'
                                            as='p'
                                            mt={1}
                                        >
                                            {questions.length} options
                                        </Heading>
                                    )}
                                </Box>
                                <AccordionIcon alignSelf='center' />
                            </AccordionButton>
                            <AccordionPanel
                                pt={4}
                                borderTop={{ base: '1px solid', md: 'none' }}
                                borderColor='gray.100'
                                px={{ base: 3, md: 16 }}
                                pb={8}
                            >
                                {!questions.length && (
                                    <Heading
                                        textAlign='left'
                                        fontSize={{ base: 'sm', md: 'md' }}
                                        fontWeight={{
                                            base: 'semibold',
                                            md: '400',
                                        }}
                                        as='p'
                                        fontStyle='italic'
                                    >
                                        Contains no matching options.
                                    </Heading>
                                )}
                                <VStack alignItems='start' spacing={6}>
                                    {questions}
                                </VStack>
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            );
        }
    );

    return (
        <Box>
            {!isSmallScreen && <Breadcrumbs />}
            <Flex layerStyle='selector'>
                <Flex>
                    <Heading as='h2' textStyle='h2' mb='0'>
                        Select questions
                    </Heading>
                    <Button
                        colorScheme='red'
                        variant='solid'
                        rightIcon={
                            <IconContext.Provider
                                value={{ className: 'btn-icon' }}
                            >
                                <IoIosArrowRoundForward />
                            </IconContext.Provider>
                        }
                        disabled={!currentQuestions.length}
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                </Flex>
            </Flex>
            <Flex
                my={2}
                mx={{ base: 4, md: 4, lg: 8, xl: 'auto' }}
                maxW='1200px'
                align='center'
                justify='space-between'
                mb={4}
                flexWrap='wrap'
            >
                <Text size='2xl' fontWeight='bold'>
                    Showing questions for: {currentYears.join(', ')}
                    <Box as='span' opacity='0.5' mx={1}>
                        •
                    </Box>
                    {formatCurrentGeo({
                        currentGeo,
                        currentYears,
                        availableYearsGeography,
                    })}
                </Text>
                <Box width={{ base: '100%', md: '350px' }}>
                    <SearchInput
                        query={query}
                        setQuery={handleSetQuery}
                        placeholder='Search questions and answers'
                    />
                </Box>
            </Flex>
            <Flex direction='column' maxW='1200px' mx={{ base: 4, lg: 'auto' }}>
                <Box>
                    <CheckboxGroup
                        size='xl'
                        colorScheme='red'
                        defaultValue={currentQuestions}
                        value={currentQuestions}
                        onChange={handleQuestionSelect}
                    >
                        <Accordion
                            id='questions-selector-container'
                            allowMultiple
                            index={expandedCategoryIndexes}
                            onChange={e => setExpandedCategoryIndexes(e)}
                        >
                            {categories}
                        </Accordion>
                    </CheckboxGroup>
                </Box>
            </Flex>
        </Box>
    );
};

export default QuestionSelector;
