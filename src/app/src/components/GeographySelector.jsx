import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Flex,
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

import {
    setGeoSelection,
    setGeoSelectionMode,
    setQuestionKeys,
} from '../redux/app.actions';
import { CONFIG, GEO_COUNTRY, GEO_REGION } from '../utils/constants';

const GeographySelector = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { geoMode, currentGeo } = useSelector(state => state.app);
    const [prevGeoSelection, setPrevGeoSelection] = useState([]);

    const handleGeoSet = newGeoMode => {
        // Prevent making changes if the user clicked the current geo mode button
        if (newGeoMode === geoMode) return;

        // Clear out any selected geographies if the user switched modes.
        // Regions and countries are not able to be selected at the same time.
        // However, retain the previous mode's selection, so they can be
        // restored if the mode is switched on again (i.e., the user doesn't
        // have to reselect them).
        dispatch(setGeoSelection(prevGeoSelection));
        setPrevGeoSelection(currentGeo);

        // Set the new geo selection mode
        dispatch(setGeoSelectionMode(newGeoMode));
    };

    const handleSelection = selections => {
        dispatch(setGeoSelection(selections));
    };

    const handleNext = () => {
        // Remove any previously selected question keys from state, otherwise
        // they will be re-rendered when the app navigates to the next section,
        // and the user will have to uncheck any/all that they don't want.
        dispatch(setQuestionKeys([]));
        history.push('/questions');
    };

    // The list of either regions or countries to show
    const geoList = CONFIG[geoMode].geographies;
    const section = (
        <Box>
            <HStack>
                <Heading as='h2' fontWeight='light'>
                    Choose one or more areas to analyze
                </Heading>
                <Button
                    colorScheme='red'
                    rightIcon={
                        <IconContext.Provider value={{ className: 'btn-icon' }}>
                            <IoIosArrowRoundForward />
                        </IconContext.Provider>
                    }
                    disabled={!currentGeo.length}
                    onClick={handleNext}
                >
                    Next
                </Button>
            </HStack>
            <Flex alignItems='baseline'>
                <Button
                    variant='link'
                    size='lg'
                    onClick={() => handleGeoSet(GEO_REGION)}
                >
                    REGIONS
                </Button>
                <Text
                    fontSize='sm'
                    textTransform='uppercase'
                    mx='2'
                    color='gray.600'
                    fontWeight='medium'
                >
                    or
                </Text>
                <Button
                    variant='link'
                    size='lg'
                    onClick={() => handleGeoSet(GEO_COUNTRY)}
                >
                    COUNTRIES
                </Button>
            </Flex>
            <VStack>
                <CheckboxGroup
                    key={`geogroup-${geoMode}`}
                    onChange={handleSelection}
                    defaultValue={currentGeo}
                >
                    {geoList.map(geo => (
                        <Checkbox
                            key={`geo-${geo}`}
                            value={geo}
                            size='lg'
                            colorScheme='red'
                        >
                            {geo}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            </VStack>
        </Box>
    );
    return section;
};

export default GeographySelector;
