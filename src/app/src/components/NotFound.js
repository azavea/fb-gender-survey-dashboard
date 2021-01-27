import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Heading, Text, VStack, Link, Icon } from '@chakra-ui/react';
import { IoIosArrowRoundBack } from 'react-icons/io';

const NotFound = () => (
    <VStack spacing={4} margin={8}>
        <Heading as='h2' size='xl'>
            404
        </Heading>
        <Text>
            The page you’re looking for doesn’t exist, or the link you followed
            was incorrect.
        </Text>
        <Link as={RouterLink} to='/'>
            <Icon as={IoIosArrowRoundBack} /> Go to home
        </Link>
    </VStack>
);

export default NotFound;
