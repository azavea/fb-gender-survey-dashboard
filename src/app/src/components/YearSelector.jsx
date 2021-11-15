import { useMemo, useEffect } from 'react';
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
import { CONFIG, ROUTES } from '../utils/constants';
import { calculateAvailableGeo } from '../utils';
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

    // Select the appropriate config file based on the current geoMode
    const survey = CONFIG[geoMode]?.survey;
    const years = useMemo(
        () => (geoMode && data[geoMode] ? Object.keys(data[geoMode]) : []),
        [geoMode, data]
    );

    // Select the available years based on available questions for selected geographies
    const availableYearsGeography = useMemo(
        () =>
            calculateAvailableGeo({ years, geoMode, currentGeo, data, survey }),
        [years, geoMode, currentGeo, data, survey]
    );

    // If only one year is available, autoselect that year
    useEffect(() => {
        const availableYears = Object.keys(availableYearsGeography).filter(
            y => availableYearsGeography[y].length
        );
        if (availableYears.length === 1) {
            dispatch(setYears(availableYears));
        }
    }, [availableYearsGeography, dispatch]);

    // If a page reloads directly to this page, restart at home
    if (!currentGeo.length) {
        history.push('/');
        return null;
    }

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
                        Select the survey year
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
                my={2}
                mx={{ base: 4, md: 4, lg: 8, xl: 'auto' }}
                maxW='1200px'
            >
                <Text size='2xl' fontWeight='bold'>
                    Showing options for: {currentGeo.join(', ')}
                </Text>
            </Flex>
            <Flex
                m={{ base: 4, md: 8 }}
                flexDirection='column-reverse'
                maxW='1200px'
                mx={{ base: 4, lg: 'auto' }}
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
                            value={currentYears[0]}
                        >
                            <VStack
                                spacing={5}
                                direction='column'
                                align='start'
                            >
                                {years.length ? (
                                    years.map(year => {
                                        const geos =
                                            availableYearsGeography[year];
                                        const unavailableGeos = currentGeo.filter(
                                            g => !geos.includes(g)
                                        );
                                        return (
                                            <Radio
                                                key={`year-${year}`}
                                                value={year}
                                                size='lg'
                                                colorScheme='red'
                                                isDisabled={!geos?.length}
                                            >
                                                {year}{' '}
                                                {unavailableGeos.length
                                                    ? `(not available for ${unavailableGeos.join(
                                                          ', '
                                                      )})`
                                                    : ''}
                                            </Radio>
                                        );
                                    })
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
