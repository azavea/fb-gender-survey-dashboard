import React from 'react';
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

import { setGeoSelection, setGeoSelectionMode } from '../redux/app.actions';
import { CONFIG, GEO_COUNTRY, GEO_REGION } from '../utils/constants';

const GeographySelector = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { geoMode, currentGeo } = useSelector(state => state.app);

    const handleGeoSet = geo => {
        dispatch(setGeoSelectionMode(geo));
    };

    const handleSelection = selections => {
        dispatch(setGeoSelection(selections));
    };

    const handleNext = () => {
        history.push('/questions');
    };

    // This list of either regions or countries to show
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
                <CheckboxGroup onChange={handleSelection}>
                    {geoList.map(r => (
                        <Checkbox
                            key={`geo-${r}`}
                            value={r}
                            size='lg'
                            colorScheme='red'
                        >
                            {r}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            </VStack>
        </Box>
    );
    return section;
};

export default GeographySelector;
