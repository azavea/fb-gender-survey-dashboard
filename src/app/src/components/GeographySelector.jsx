import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    HStack,
    Text,
    VStack,
} from '@chakra-ui/react';

import config from '../data/config.json';
import { setGeoSelection, setGeoSelectionMode } from '../redux/app.actions';
import { GEO_COUNTRY, GEO_REGION } from '../utils/constants';

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
    const geoList = config[geoMode];

    const section = (
        <Box>
            <HStack>
                <Text>Choose one or more areas to analyze</Text>
                <Button disabled={!currentGeo.length} onClick={handleNext}>
                    Next
                </Button>
            </HStack>
            <Box>
                <Button
                    variant={geoMode === GEO_REGION ? 'link' : 'ghost'}
                    onClick={() => handleGeoSet(GEO_REGION)}
                >
                    REGIONS
                </Button>{' '}
                or{' '}
                <Button
                    variant={geoMode === GEO_COUNTRY ? 'link' : 'ghost'}
                    onClick={() => handleGeoSet(GEO_COUNTRY)}
                >
                    COUNTRIES
                </Button>
            </Box>
            <VStack>
                <CheckboxGroup onChange={handleSelection}>
                    {geoList.map(r => (
                        <Checkbox key={`geo-${r}`} value={r}>
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
