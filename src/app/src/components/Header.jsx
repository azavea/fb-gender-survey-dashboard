import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    Button,
    HStack,
    Flex,
    Box,
    Heading,
    Text,
    VStack,
    useDisclosure,
    Link as ChakraLink,
    Spacer,
} from '@chakra-ui/react';

import AboutModal from './AboutModal';
import FaqModal from './FaqModal';

import { ROUTES } from '../utils/constants';

const Header = () => {
    const { pathname } = useLocation();
    const isLargeFormat = pathname === ROUTES.HOME;
    const titleJustify = isLargeFormat ? 'center' : 'flex-start';

    // Manage the visibility state of various modals
    const {
        isOpen: faqIsOpen,
        onOpen: faqOnOpen,
        onClose: faqOnClose,
    } = useDisclosure();
    const {
        isOpen: aboutIsOpen,
        onOpen: aboutOnOpen,
        onClose: aboutOnClose,
    } = useDisclosure();

    const linkBar = (
        <Flex justify='space-between' width='100%'>
            {!isLargeFormat ? (
                <Heading
                    as='h1'
                    textStyle='h3'
                    lineHeight='1.5'
                    fontWeight='normal'
                    align='flex-start'
                    maxWidth='790px'
                    my={2}
                    mx={{ base: 1, md: 4, lg: 8 }}
                >
                    <ChakraLink href='/' variant='homeLink'>
                        Survey on Gender Equality at Home
                    </ChakraLink>
                </Heading>
            ) : (
                <Spacer />
            )}
            <HStack spacing={8} p={2} mr={{ base: 1, md: 4, lg: 8 }}>
                <Button variant='invertedLink' onClick={faqOnOpen}>
                    FAQS
                </Button>
                <Button variant='invertedLink' onClick={aboutOnOpen}>
                    About the Survey
                </Button>
                <Button variant='invertedLink' as={Link} to={ROUTES.SAVED}>
                    Saved Charts
                </Button>
            </HStack>
        </Flex>
    );

    if (isLargeFormat) {
        return (
            <VStack
                as='header'
                bg='linear-gradient(-225deg, rgb(26, 43, 51) 0%, rgb(1, 16, 23) 100%)'
                p={{ base: 1, md: 4, lg: 8 }}
            >
                {linkBar}
                <Flex width='100%' justify={titleJustify}>
                    <VStack
                        color='white'
                        maxWidth='54rem'
                        m={4}
                        spacing={4}
                        textAlign='center'
                    >
                        <Heading as='h1' textStyle='h1'>
                            <Box textStyle='miniTitle'>Dashboard</Box>
                            Survey on Gender Equality at Home
                        </Heading>
                        <Text fontSize='lg'>
                            Explore the country and region-level data from the
                            July 2020 survey, comprising over 460,000 Facebook
                            users in 208 countries, territories, and islands in
                            80 languages.{' '}
                            <ChakraLink
                                href='https://data.humdata.org/dataset/survey-on-gender-equality-at-home'
                                isExternal
                                variant='inverted'
                            >
                                View the full aggregate dataset here.
                            </ChakraLink>
                        </Text>
                    </VStack>
                    <FaqModal isOpen={faqIsOpen} onClose={faqOnClose} />
                    <AboutModal isOpen={aboutIsOpen} onClose={aboutOnClose} />
                </Flex>
            </VStack>
        );
    }

    return (
        <VStack as='header' className='App-header' bg='rgb(26, 43, 51)' py='2'>
            {linkBar}
            <FaqModal isOpen={faqIsOpen} onClose={faqOnClose} />
            <AboutModal isOpen={aboutIsOpen} onClose={aboutOnClose} />
        </VStack>
    );
};

export default Header;
