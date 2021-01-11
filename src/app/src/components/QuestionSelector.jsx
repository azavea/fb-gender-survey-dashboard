import React, { useState } from 'react';
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
    HStack,
    Text,
    Heading,
    VStack,
    Flex,
    Spacer,
} from '@chakra-ui/react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IconContext } from 'react-icons';

import { setQuestionKeys } from '../redux/app.actions';
import { CONFIG } from '../utils/constants';
import { formatQuery } from '../utils';
import Breadcrumbs from './Breadcrumbs';
import SearchInput from './SearchInput';

const QuestionSelector = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const { currentGeo, currentQuestions, geoMode } = useSelector(
        state => state.app
    );

    // Select the appropriate config file based on the current geoMode
    const config = CONFIG[geoMode];

    // If a page reloads directly to this page, restart at home
    if (!currentGeo.length) {
        history.push('/');
        return null;
    }

    // Known categories
    const questionsByCategory = { A: [], B: [], C: [], D: [] };

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
        history.push('/visualization');
    };

    Object.entries(config.survey).forEach(([key, question]) => {
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
                    <Box>
                        <Text fontWeight='bold'>{item.cat}</Text>
                        <Text>{`(Answer to: ${item.question})`}</Text>
                    </Box>
                );
            }

            return (
                <Box>
                    <Text>{item.question}</Text>
                </Box>
            );
        }

        // Likert scale questions ignore the category rendering, and we can grab
        // the question from any of the respones/question paris that share the
        // qcode.
        const item = Object.values(config.survey).find(q => q.qcode === key);
        return item.question;
    };

    // Detremine the indexes of any categories that currently have questions
    // selected. These will be expanded by default.
    const categoryLetterCodes = Object.values(config.categories);
    const currentlySelectedCategories = new Set(
        currentQuestions.map(q => q[0].toUpperCase())
    );
    const currentlySelectedCategoryIndexes = Array.from(
        currentlySelectedCategories
    ).map(catCode => categoryLetterCodes.indexOf(catCode));

    const categories = Object.keys(config.categories).map(cat => {
        const catCode = config.categories[cat];
        const questionCodes = questionsByCategory[catCode];

        const filteredQuestionCodes = query.trim().length
            ? questionCodes.filter(q => {
                  const item = config.survey[q];
                  return (
                      currentQuestions.includes(q) ||
                      (item &&
                          formatQuery(`${item.question} ${item.cat}`).includes(
                              formatQuery(query)
                          ))
                  );
              })
            : questionCodes;

        const questions = filteredQuestionCodes.map(q => {
            return (
                <Checkbox key={q} value={q} size='lg' colorScheme='red'>
                    {getQuestionCheckboxLabel(q)}
                </Checkbox>
            );
        });

        if (!questions.length) {
            return (
                <Heading
                    flex='1'
                    textAlign='left'
                    fontSize='2xl'
                    fontWeight='regular'
                    as='h3'
                    bg='white'
                    p={4}
                    mt={4}
                >
                    {cat} contains no matching questions.
                </Heading>
            );
        }

        const allChecked = questionCodes.every(qcode =>
            currentQuestions.includes(qcode)
        );
        const isIndeterminate =
            questionCodes.some(qcode => currentQuestions.includes(qcode)) &&
            !allChecked;

        return (
            <AccordionItem key={`qgroup-${catCode}`}>
                <AccordionButton>
                    <Checkbox
                        p={3}
                        value={catCode}
                        isIndeterminate={isIndeterminate}
                    />
                    <Heading
                        flex='1'
                        textAlign='left'
                        fontSize='2xl'
                        fontWeight='regular'
                        as='h3'
                    >
                        {cat}
                    </Heading>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <VStack alignItems='start' spacing={6}>
                        {questions}
                    </VStack>
                </AccordionPanel>
            </AccordionItem>
        );
    });

    return (
        <Box>
            <Breadcrumbs />
            <HStack>
                <Heading as='h2' fontWeight='light'>
                    Select questions
                </Heading>
                <Button
                    colorScheme='red'
                    variant='solid'
                    rightIcon={
                        <IconContext.Provider value={{ className: 'btn-icon' }}>
                            <IoIosArrowRoundForward />
                        </IconContext.Provider>
                    }
                    disabled={!currentQuestions.length}
                    onClick={handleNext}
                >
                    Next
                </Button>
            </HStack>
            <Flex m={4}>
                <Text size='2xl'>{currentGeo.join(', ')}</Text>
                <Spacer />
                <SearchInput
                    query={query}
                    setQuery={setQuery}
                    placeholder='Filter questions'
                />
            </Flex>
            <Box>
                <CheckboxGroup
                    size='xl'
                    colorScheme='red'
                    defaultValue={currentQuestions}
                    value={currentQuestions}
                    onChange={handleQuestionSelect}
                >
                    <Accordion
                        allowMultiple
                        defaultIndex={currentlySelectedCategoryIndexes}
                    >
                        {categories}
                    </Accordion>
                </CheckboxGroup>
            </Box>
        </Box>
    );
};

export default QuestionSelector;
