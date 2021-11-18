import React, { useState, useMemo } from 'react';
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
    Spacer,
    SimpleGrid,
} from '@chakra-ui/react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IconContext } from 'react-icons';

import {
    setGeoSelection,
    setGeoSelectionMode,
    setYears,
} from '../redux/app.actions';
import { CONFIG, GEO_COUNTRY, GEO_REGION, ROUTES } from '../utils/constants';
import { formatQuery } from '../utils';
import SearchInput from './SearchInput';

const GeographySelector = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { geoMode, currentGeo, data } = useSelector(state => state.app);
    const [prevGeoSelection, setPrevGeoSelection] = useState([]);
    const [query, setQuery] = useState('');

    const years = useMemo(
        () => (geoMode && data[geoMode] ? Object.keys(data[geoMode]) : []),
        [geoMode, data]
    );

    // The list of either regions or countries to show
    let geoList = CONFIG[geoMode].geographies;

    const geoData = data[geoMode];
    const yearAvailability = useMemo(
        () =>
            geoList.reduce(
                (ya, geo) => ({
                    ...ya,
                    [geo]: years.filter(y => {
                        const { Combined, Female, Male } = geoData[
                            y
                        ].geographies[geo];
                        const isUnavailable =
                            Combined.every(el => !el) &&
                            Female.every(el => !el) &&
                            Male.every(el => !el);
                        return !isUnavailable;
                    }),
                }),
                {}
            ),
        [years, geoList, geoData]
    );

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
        // Remove any previously selected years from state, otherwise
        // they will be re-rendered when the app navigates to the next section,
        // and the user will have to uncheck any/all that they don't want.
        dispatch(setYears([]));
        history.push(ROUTES.YEARS);
    };

    if (query.trim().length && geoMode === GEO_COUNTRY) {
        geoList = geoList.filter(
            g =>
                formatQuery(g).includes(formatQuery(query)) ||
                currentGeo.includes(g)
        );
    }

    const regionInputStyle = {
        pointerEvents: 'none',
        opacity: 0,
    };

    return (
        <Box>
            <Flex layerStyle='selector'>
                <Flex>
                    <Heading as='h2' textStyle='h2' mb='0'>
                        Start by selecting countries or regions
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
                        disabled={!currentGeo.length}
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                </Flex>
            </Flex>
            <Flex
                my={4}
                mx={{ base: 4, md: 8, xl: 'auto' }}
                mb='40px'
                maxW='1200px'
                align='center'
                justify='space-between'
                flexWrap='wrap'
            >
                <Flex alignItems='baseline'>
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
                <Box
                    width={{ base: '100%', md: '350px' }}
                    style={geoMode === GEO_REGION ? regionInputStyle : {}}
                >
                    <SearchInput
                        query={query}
                        setQuery={setQuery}
                        placeholder='Search countries'
                    />
                </Box>
            </Flex>
            <Flex
                m={{ base: 4, md: 8, xl: 'auto' }}
                flexDirection='row'
                maxW='1200px'
                alignItems='flex-start'
                justifyContent='space-between'
            >
                <Flex flex='auto' direction='column' justify='center'>
                    <Box id={`${geoMode}-selector-container`}>
                        <CheckboxGroup
                            key={`geogroup-${geoMode}`}
                            onChange={handleSelection}
                            defaultValue={currentGeo}
                        >
                            <SimpleGrid
                                spacing={5}
                                mb='50px'
                                minChildWidth='250px'
                            >
                                {geoList.length ? (
                                    geoList.map(geo => {
                                        const availableYears =
                                            yearAvailability[geo];
                                        return (
                                            <Checkbox
                                                key={`geo-${geo}`}
                                                value={geo}
                                                size='lg'
                                                colorScheme='red'
                                            >
                                                {geo}{' '}
                                                {availableYears.length <
                                                years.length
                                                    ? `(${availableYears.join(
                                                          ', '
                                                      )} only)`
                                                    : ''}
                                            </Checkbox>
                                        );
                                    })
                                ) : (
                                    <Text>No areas found.</Text>
                                )}
                            </SimpleGrid>
                        </CheckboxGroup>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};

export default GeographySelector;
