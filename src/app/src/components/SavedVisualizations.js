import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Text,
    Heading,
    Flex,
    Button,
    IconButton,
    useMediaQuery,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { IoIosArrowRoundForward, IoIosTrash } from 'react-icons/io';

import { ROUTES } from '../utils/constants';
import { setVisualization } from '../redux/app.actions';
import { deleteVisualization } from '../redux/visualizations.actions';
import Breadcrumbs from './Breadcrumbs';
import EditableTitle from './EditableTitle';
import { IoIosArrowRoundBack } from 'react-icons/io';

const SavedVisualizations = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const visualizations = useSelector(state => state.visualizations);

    const onClickList = data => {
        const { currentYear, ...visualization } = data;
        // User has an old visualization stored using 'currentYear'
        if (!!currentYear) {
            dispatch(
                setVisualization({
                    ...visualization,
                    currentYears: [currentYear.toString()],
                })
            );
        } else {
            dispatch(setVisualization(visualization));
        }
        history.push(ROUTES.VISUALIZATIONS);
    };

    // Show or hide the breadcrumbs if small screen
    const [isSmallScreen] = useMediaQuery('(max-width: 30em)');

    const renderSavedVisualization = (
        {
            title,
            currentQuestions,
            currentGeo,
            currentYears,
            currentYear,
            geoMode,
        },
        index
    ) => (
        <Flex
            role='button'
            layerStyle='savedVizButton'
            flexDirection={{ base: 'column', md: 'row' }}
            onClick={() =>
                onClickList({
                    currentQuestions,
                    currentGeo,
                    currentYears,
                    currentYear,
                    geoMode,
                })
            }
            key={`${index}-${title}`}
        >
            <Box flex={1} width='100%'>
                <Flex>
                    <EditableTitle title={title} index={index} />
                </Flex>
                <Flex role='group'>
                    <Text>{currentQuestions.length} questions</Text>
                    <Box as='span' opacity='0.5' mx={1}>
                        •
                    </Box>
                    <Button
                        leftIcon={<IoIosTrash />}
                        textTransform='none'
                        letterSpacing='0'
                        size='small'
                        variant='ghost'
                        colorScheme='red'
                        onClick={e => {
                            e.stopPropagation();
                            dispatch(deleteVisualization(index));
                        }}
                    >
                        Delete
                    </Button>
                </Flex>
            </Box>
            <Flex
                alignSelf={{ base: 'flex-start', md: 'center' }}
                ml={{ base: 0, md: 4 }}
            >
                <IconButton
                    className='arrow-button'
                    size='md'
                    variant='ghost'
                    isRound
                    icon={<IoIosArrowRoundForward size={32} />}
                />
            </Flex>
        </Flex>
    );

    return (
        <Box>
            {!isSmallScreen && <Breadcrumbs />}
            <Flex layerStyle='selector' alignItems='baseline'>
                <Flex>
                    <Heading as='h2' textStyle='h2' mb={{ base: 2, lg: 0 }}>
                        Saved Charts
                    </Heading>
                    <Text>
                        Charts are saved locally in your browser. Clearing your
                        browser data may impact this page.
                    </Text>
                </Flex>
            </Flex>
            <Box
                direction='column'
                maxW='1200px'
                mt={8}
                mx={{ base: 4, md: 4, lg: 'auto' }}
            >
                {visualizations.length ? (
                    visualizations.map(renderSavedVisualization)
                ) : (
                    <Box
                        p={4}
                        m={4}
                        borderRadius='sm'
                        textAlign='center'
                        maxW='500px'
                        mx={{ base: 4, md: 4, lg: 'auto' }}
                    >
                        <Text fontSize='lg'>
                            You have no saved charts yet. Click the “Save”
                            button on the charts page in order to keep track of
                            them here.
                        </Text>
                        <Button
                            as='button'
                            leftIcon={IoIosArrowRoundBack}
                            mt={4}
                            onClick={() => history.push(ROUTES.HOME)}
                        >
                            Go to Home
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SavedVisualizations;
