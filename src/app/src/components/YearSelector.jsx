import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Flex,
    Button,
    Radio,
    RadioGroup,
    useMediaQuery,
    Text,
    Heading,
    VStack,
    Spacer,
} from '@chakra-ui/react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IconContext } from 'react-icons';

import { setQuestionKeys, setYears } from '../redux/app.actions';
import { ROUTES } from '../utils/constants';
import Breadcrumbs from './Breadcrumbs';

// TODO: Update this component to use Checkboxes when multi-year comparison is enabled
const YearSelector = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { geoMode, currentGeo, data, currentYears } = useSelector(
        state => state.app
    );

    // Show or hide the breadcrumbs if small screen
    const [isSmallScreen] = useMediaQuery('(max-width: 30em)');

    // If a page reloads directly to this page, restart at home
    if (!currentGeo.length) {
        history.push('/');
        return null;
    }

    const availableYears = Object.keys(data[geoMode]);

    const handleSelection = selections => {
        dispatch(setYears([selections]));
    };

    const handleNext = () => {
        // Remove any previously selected question keys from state, otherwise
        // they will be re-rendered when the app navigates to the next section,
        // and the user will have to uncheck any/all that they don't want.
        dispatch(setQuestionKeys([]));
        history.push(ROUTES.QUESTIONS);
    };

    const section = (
        <Box>
            {!isSmallScreen && <Breadcrumbs />}
            <Flex layerStyle='selector'>
                <Flex>
                    <Heading as='h2' textStyle='h2' mb='0'>
                        Select the year(s) to view
                    </Heading>
                    <Spacer />
                    <Button
                        colorScheme='red'
                        rightIcon={
                            <IconContext.Provider
                                value={{ className: 'btn-icon' }}
                            >
                                <IoIosArrowRoundForward />
                            </IconContext.Provider>
                        }
                        disabled={!currentYears.length}
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                </Flex>
            </Flex>
            <Flex
                m={{ base: 4, md: 8 }}
                flexDirection={{
                    base: 'column-reverse',
                    md: 'column-reverse',
                    lg: 'row',
                }}
                maxW='1200px'
                mx={{ base: 4, lg: 'auto' }}
                alignItems='flex-start'
                justifyContent='space-between'
            >
                <Flex
                    flex='auto'
                    direction='column'
                    ml={{ base: 4, md: 8, xl: 0 }}
                >
                    <Box id={`year-selector-container`}>
                        <RadioGroup
                            key={`year-selector`}
                            onChange={handleSelection}
                            defaultValue={currentYears[0]}
                        >
                            <VStack
                                spacing={5}
                                direction='column'
                                align='start'
                            >
                                {availableYears.length ? (
                                    availableYears.map(year => (
                                        <Radio
                                            key={`year-${year}`}
                                            value={year}
                                            size='lg'
                                            colorScheme='red'
                                        >
                                            {year}
                                        </Radio>
                                    ))
                                ) : (
                                    <Text>No years available.</Text>
                                )}
                            </VStack>
                        </RadioGroup>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
    return section;
};

export default YearSelector;
