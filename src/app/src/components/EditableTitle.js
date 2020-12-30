import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Flex,
    IconButton,
    Editable,
    EditableInput,
    EditablePreview,
    ButtonGroup,
} from '@chakra-ui/react';
import { IoMdCreate, IoIosCheckmark } from 'react-icons/io';

import { renameVisualization } from '../redux/visualizations.actions';

function EditableControls({ isEditing, onSubmit, onEdit }) {
    return isEditing ? (
        <ButtonGroup
            alignItems='center'
            ml={4}
            onClick={e => e.stopPropagation()}
        >
            <IconButton
                size='sm'
                isRound
                icon={<IoIosCheckmark />}
                onClick={onSubmit}
                fontSize='2xl'
            />
        </ButtonGroup>
    ) : (
        <Flex
            alignItems='center'
            ml={4}
            minWidth='32px'
            onClick={e => e.stopPropagation()}
        >
            <IconButton
                size='sm'
                isRound
                icon={<IoMdCreate />}
                onClick={onEdit}
                display='none'
                _groupHover={{ display: 'flex' }}
            />
        </Flex>
    );
}

function EditableTitle({ title, index }) {
    const dispatch = useDispatch();

    const onSubmit = value => {
        dispatch(renameVisualization({ title: value, index }));
    };

    // 'stopPropagation' needs to be used on several subcomponents to prevent
    // clicks on the buttons and within the input from navigating the user
    // to the saved visualization.
    return (
        <Editable
            textAlign='left'
            defaultValue={title}
            color='rgb(39, 55, 63)'
            fontSize='2xl'
            isPreviewFocusable={false}
            display='flex'
            flex={1}
            alignContent='center'
            align='center'
            role='group'
            onSubmit={onSubmit}
        >
            {props => (
                <>
                    <EditablePreview />
                    <EditableInput onClick={e => e.stopPropagation()} />
                    <EditableControls {...props} />
                </>
            )}
        </Editable>
    );
}

export default EditableTitle;
