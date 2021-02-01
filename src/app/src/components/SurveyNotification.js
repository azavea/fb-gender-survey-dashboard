import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Alert,
    AlertIcon,
    AlertDescription,
    Box,
    Flex,
    CloseButton,
    Link,
} from '@chakra-ui/react';

import { setSurveyHasBeenDisplayed } from '../redux/survey.actions';

const surveyURL =
    'https://docs.google.com/forms/d/e/1FAIpQLSfWXehbiAY_7E02FJXDIjbL4dbJSDtQ7DRE_e9uKNeADFmEKw/viewform';

const SurveyNotification = () => {
    const dispatch = useDispatch();
    const { surveyHasBeenDisplayed, showSurvey } = useSelector(
        state => state.survey
    );

    const markSurveyDisplayed = () => dispatch(setSurveyHasBeenDisplayed(true));

    if (showSurvey && !surveyHasBeenDisplayed) {
        return (
            <Box width='100%' zIndex={1} pos='sticky' top='0'>
                <Alert status='info' colorScheme='red' variant='solid'>
                    <Flex
                        width=' 100%'
                        maxW='1200px'
                        mx='auto'
                        alignItems='center'
                    >
                        <AlertIcon />
                        <Flex flex='1' alignItems='center'>
                            <AlertDescription display='block' mr='10px'>
                                You’re invited to take a 30-second survey about
                                this dataset –{' '}
                                <Link
                                    href={surveyURL}
                                    textDecoration='underline'
                                    color='white'
                                    isExternal
                                    onClick={markSurveyDisplayed}
                                >
                                    click here to begin!
                                </Link>
                            </AlertDescription>
                            <CloseButton
                                ml='auto'
                                onClick={markSurveyDisplayed}
                            />
                        </Flex>
                    </Flex>
                </Alert>
            </Box>
        );
    }

    return null;
};

export default SurveyNotification;
