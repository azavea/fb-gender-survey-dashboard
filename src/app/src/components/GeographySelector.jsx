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
            <Flex layerStyle='selector'>
                <Heading as='h2' textStyle='h2' mb='0'>
                    Start by selecting countries or regions
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
            <Flex m={{ base: 4, md: 4, lg: 8 }}>
                <Flex flex={1} direction='column'>
                    <Box mb={4}>
                        <Flex alignItems='baseline' mb={4}>
                            <Button
                                className={geoMode === GEO_COUNTRY && 'current'}
                                variant='link'
                                size='lg'
                                onClick={() => handleGeoSet(GEO_COUNTRY)}
                            >
                                Countries
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
                                className={geoMode === GEO_REGION && 'current'}
                                variant='link'
                                size='lg'
                                onClick={() => handleGeoSet(GEO_REGION)}
                            >
                                Regions
                            </Button>
                        </Flex>
                        {geoMode === GEO_COUNTRY && (
                            <SearchInput query={query} setQuery={setQuery} />
                        )}
                    </Box>
                    <Box>
                        <CheckboxGroup
                            key={`geogroup-${geoMode}`}
                            onChange={handleSelection}
                            defaultValue={currentGeo}
                        >
                            <VStack
                                spacing={5}
                                direction='column'
                                align='start'
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
                            </VStack>
                        </CheckboxGroup>
                    </Box>
                </Flex>
                <Flex flex={2} />
            </Flex>
        </Box>
    );
    return section;
};

export default GeographySelector;
