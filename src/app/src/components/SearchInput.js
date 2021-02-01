import React from 'react';
import {
    FormControl,
    FormLabel,
    VisuallyHidden,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';

const SearchInput = ({ query, setQuery, placeholder }) => {
    return (
        <FormControl role='search' as='form' flex={1}>
            <FormLabel>
                <VisuallyHidden>Search</VisuallyHidden>
            </FormLabel>
            <InputGroup bg='white'>
                <InputLeftElement
                    pointerEvents='none'
                    children={
                        <Text color='gray.500' fontSize='1rem'>
                            <IoIosSearch />
                        </Text>
                    }
                />
                <Input
                    type='text'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={placeholder}
                />
            </InputGroup>
        </FormControl>
    );
};

export default SearchInput;
