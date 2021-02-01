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
    Image,
    Heading,
    useMediaQuery,
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
import surveyMapImage from '../images/gender-survey-countries.png';

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

    // Show or hide the image based on a media query
    const [isSmallScreen] = useMediaQuery('(max-width: 700px)');

    const section = (
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
                            <Box maxW={{ md: '325px' }}>
                                <SearchInput
                                    query={query}
                                    setQuery={setQuery}
                                />
                            </Box>
                        )}
                    </Box>
                    <Box id={`${geoMode}-selector-container`}>
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
                {!isSmallScreen && (
                    <Box
                        maxWidth='750px'
                        flex='auto'
                        ml={{ base: 0, md: 8, lg: 8 }}
                        mr={{ base: 4, md: 8, xl: 0 }}
                        mb={{ base: 0, md: 8, lg: 0 }}
                        boxShadow={{ base: 'none', md: 'none', lg: 'lg' }}
                        borderRadius='lg'
                        overflow='hidden'
                        position='relative'
                    >
                        <Box
                            bg='red.700'
                            position='absolute'
                            bottom='0'
                            right='0'
                            zIndex='docked'
                            px={3}
                            py={2}
                        >
                            <Text color='white' fontSize='xs' fontWeight={500}>
                                Red indicates countries included in the survey.
                            </Text>
                        </Box>
                        <Image
                            src={surveyMapImage}
                            alt='Countries and regions surveyed in the Gender Equality at Home Survey.'
                        />
                    </Box>
                )}
            </Flex>
        </Box>
    );
    return section;
};

export default GeographySelector;
