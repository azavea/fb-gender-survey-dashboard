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
    VStack,
} from '@chakra-ui/react';

import config from '../data/config.json';
import { setQuestionKeys } from '../redux/app.actions';

const QuestionSelector = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { currentGeo, currentQuestions } = useSelector(state => state.app);

    // If a page reload when directly to this page, restart at home
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

    // Known categories (TODO: I is a placeholder for bad data)
    const questionsByCategory = { A: [], B: [], C: [], D: [], I: [] };

    Object.entries(config.survey).forEach(([key, question]) => {
        const categoryCode = question.qcode[0].toUpperCase();
        questionsByCategory[categoryCode].push(key);
    });

    const categories = Object.keys(config.categories).map(cat => {
        const catCode = config.categories[cat];
        const questionCodes = questionsByCategory[catCode];
        const questions = questionCodes.map(q => {
            return (
                <Checkbox
                    key={q}
                    value={q}
                    defaultIsChecked={q in currentQuestions}
                >
                    {config.survey[q].question}
                </Checkbox>
            );
        });
        return (
            <AccordionItem key={`qgroup-${catCode}`}>
                <AccordionButton>
                    <Checkbox p={3} value={catCode} />
                    <Box flex='1' textAlign='left'>
                        {cat}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <VStack>{questions}</VStack>
                </AccordionPanel>
            </AccordionItem>
        );
    });

    return (
        <Box>
            <HStack>
                <Text>Select Questions</Text>
                <Button
                    disabled={!currentQuestions.length}
                    onClick={handleNext}
                >
                    Next
                </Button>
            </HStack>
            <Box>
                <CheckboxGroup onChange={handleQuestionSelect}>
                    <Accordion allowMultiple>{categories}</Accordion>
                </CheckboxGroup>
            </Box>
        </Box>
    );
};

export default QuestionSelector;
