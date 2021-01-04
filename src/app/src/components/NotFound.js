import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Heading, Text, VStack, Link, Icon } from '@chakra-ui/react';
import { IoIosArrowRoundBack } from 'react-icons/io';

const NotFound = () => (
    <VStack spacing={4} margin={8}>
        <Heading size='xl'>404</Heading>
        <Heading as='h2' size='2xl'>
            Something's missing.
        </Heading>
        <Text>
            The page you're looking for doesn't exist, or the link you followed
            was incorrect.
        </Text>
        <Link as={RouterLink} to='/'>
            <Icon as={IoIosArrowRoundBack} /> Go back home
        </Link>
    </VStack>
);

export default NotFound;
