import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Flex,
    Button,
    Checkbox,
    CheckboxGroup,
    Text,
    Heading,
    VStack,
    Spacer,
} from '@chakra-ui/react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IconContext } from 'react-icons';

import {
    setGeoSelection,
    setGeoSelectionMode,
    setQuestionKeys,
} from '../redux/app.actions';
import { CONFIG, GEO_COUNTRY, GEO_REGION } from '../utils/constants';
import { formatQuery } from '../utils';
import SearchInput from './SearchInput';

const GeographySelector = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { geoMode, currentGeo } = useSelector(state => state.app);
    const [prevGeoSelection, setPrevGeoSelection] = useState([]);
    const [query, setQuery] = useState('');

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
    let geoList = CONFIG[geoMode].geographies;

    if (query.trim().length && geoMode === GEO_COUNTRY) {
        geoList = geoList.filter(
            g =>
                formatQuery(g).includes(formatQuery(query)) ||
                currentGeo.includes(g)
        );
    }

    const section = (
        <Box>
            <Flex m={4}>
                <Heading as='h2' fontWeight='light'>
                    Start by selecting Regions or Countries
                </Heading>
                <Spacer />
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
            </Flex>
            <Flex ml={4}>
                <Flex flex={1} direction='column'>
                    <Flex alignItems='baseline' m={4}>
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
                    {geoMode === GEO_COUNTRY && (
                        <SearchInput
                            query={query}
                            setQuery={setQuery}
                            placeholder='Filter countries'
                        />
                    )}
                    <VStack align='start' m={4}>
                        <CheckboxGroup
                            key={`geogroup-${geoMode}`}
                            onChange={handleSelection}
                            defaultValue={currentGeo}
                        >
                            {geoList.length ? (
                                geoList.map(geo => (
                                    <Checkbox
                                        key={`geo-${geo}`}
                                        value={geo}
                                        size='lg'
                                        colorScheme='red'
                                    >
                                        {geo}
                                    </Checkbox>
                                ))
                            ) : (
                                <Text>No areas found.</Text>
                            )}
                        </CheckboxGroup>
                    </VStack>
                </Flex>
                <Flex flex={2} />
            </Flex>
        </Box>
    );
    return section;
};

export default GeographySelector;
