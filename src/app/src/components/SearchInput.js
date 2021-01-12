import React from 'react';
import {
    Box,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';

const SearchInput = ({ query, setQuery, placeholder }) => {
    return (
        <Box m={4} flex={1}>
            <InputGroup bg='white'>
                <InputLeftElement
                    pointerEvents='none'
                    children={
                        <Text color='gray.300' fontSize='1rem'>
                            <IoIosSearch />
                        </Text>
                    }
                />
                <Input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={placeholder}
                />
            </InputGroup>
        </Box>
    );
};

export default SearchInput;
