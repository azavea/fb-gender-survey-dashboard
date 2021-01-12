import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, Flex, Spacer, IconButton } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { IoIosArrowRoundForward, IoIosTrash } from 'react-icons/io';

import { ROUTES } from '../utils/constants';
import { setVisualization } from '../redux/app.actions';
import { deleteVisualization } from '../redux/visualizations.actions';
import Breadcrumbs from './Breadcrumbs';
import EditableTitle from './EditableTitle';

const SavedVisualizations = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const visualizations = useSelector(state => state.visualizations);

    const onClickList = visualization => {
        dispatch(setVisualization(visualization));
        history.push(ROUTES.VISUALIZATIONS);
    };

    const renderSavedVisualization = (
        { title, currentQuestions, currentGeo, currentYear, geoMode },
        index
    ) => (
        <Flex
            bg='white'
            p={4}
            m={4}
            borderRadius='sm'
            role='button'
            onClick={() =>
                onClickList({
                    currentQuestions,
                    currentGeo,
                    currentYear,
                    geoMode,
                })
            }
            direction='column'
            key={`${index}-${title}`}
        >
            <Flex flex={1}>
                <Flex flex={1}>
                    <EditableTitle title={title} index={index} />
                </Flex>
                <Flex alignItems='center' ml={4}>
                    <Text fontSize='3xl'>
                        <IoIosArrowRoundForward />
                    </Text>
                </Flex>
            </Flex>
            <Flex role='group'>
                <Text>{currentQuestions.length} questions</Text>
                <Spacer />
                <Text fontSize='3xl'>
                    <IconButton
                        aria-label='Delete visualization'
                        icon={<IoIosTrash />}
                        onClick={e => {
                            e.stopPropagation();
                            dispatch(deleteVisualization(index));
                        }}
                    />
                </Text>
            </Flex>
        </Flex>
    );

    return (
        <Box>
            <Breadcrumbs />
            <Flex
                bg='white'
                p={4}
                border='1px solid rgb(222, 227, 233)'
                align='baseline'
            >
                <Text fontSize='2xl'>Saved Charts</Text>
                <Spacer />
                <Text>
                    Charts are saved locally in your browser. Clearing your
                    browser data may impact this page.
                </Text>
            </Flex>
            <Box p={4}>
                {visualizations.length ? (
                    visualizations.map(renderSavedVisualization)
                ) : (
                    <Flex
                        bg='white'
                        p={4}
                        m={4}
                        borderRadius='sm'
                        as='button'
                        onClick={() => history.push(ROUTES.HOME)}
                    >
                        <Text fontSize='3xl'>
                            You have no saved charts yet. Click the 'Save'
                            button on the charts page in order to keep track of
                            them here.
                        </Text>
                    </Flex>
                )}
            </Box>
        </Box>
    );
};

export default SavedVisualizations;
