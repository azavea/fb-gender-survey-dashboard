import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Alert,
    AlertIcon,
    AlertDescription,
    Box,
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
            <Box pos='fixed' width='100%' zIndex={1}>
                <Alert
                    status='info'
                    colorScheme='white'
                    border='1px solid rgb(222, 227, 233)'
                >
                    <AlertIcon />
                    <Box flex='1'>
                        <AlertDescription display='block' mr='10px'>
                            You're invited to take a 30-second survey about this
                            dataset -{' '}
                            <Link
                                href={surveyURL}
                                textDecoration='underline'
                                isExternal
                                onClick={markSurveyDisplayed}
                            >
                                click here to begin!
                            </Link>
                        </AlertDescription>
                    </Box>
                    <CloseButton
                        pos='absolute'
                        right='8px'
                        top='8px'
                        onClick={markSurveyDisplayed}
                    />
                </Alert>
            </Box>
        );
    }

    return null;
};

export default SurveyNotification;
