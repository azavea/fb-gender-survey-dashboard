import React from 'react';
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
} from '@chakra-ui/react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IconContext } from 'react-icons';

import { setQuestionKeys } from '../redux/app.actions';
import { CONFIG } from '../utils/constants';

const QuestionSelector = () => {
    const history = useHistory();
    const dispatch = useDispatch();
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

    const handleQuestionSelect = selected => {
        // TODO: check if it's a catCode and select all subelements
        dispatch(setQuestionKeys(selected));
    };
    const handleNext = () => {
        history.push('/visualization');
    };

    // Known categories
    const questionsByCategory = { A: [], B: [], C: [], D: [] };

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

    const categories = Object.keys(config.categories).map(cat => {
        const catCode = config.categories[cat];
        const questionCodes = questionsByCategory[catCode];
        const questions = questionCodes.map(q => {
            return (
                <Checkbox
                    key={q}
                    value={q}
                    defaultIsChecked={q in currentQuestions}
                    size='lg'
                    colorScheme='red'
                >
                    {getQuestionCheckboxLabel(q)}
                </Checkbox>
            );
        });
        return (
            <AccordionItem key={`qgroup-${catCode}`}>
                <AccordionButton>
                    <Checkbox p={3} value={catCode} />
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
            <Box>
                <CheckboxGroup
                    size='xl'
                    colorScheme='red'
                    onChange={handleQuestionSelect}
                >
                    <Accordion allowMultiple>{categories}</Accordion>
                </CheckboxGroup>
            </Box>
        </Box>
    );
};

export default QuestionSelector;
