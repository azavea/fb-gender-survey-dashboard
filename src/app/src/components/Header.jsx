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
        <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            justify={{ base: 'center', md: 'space-between' }}
            width='100%'
            maxW='1200px'
        >
            {!isLargeFormat && (
                <Heading
                    as='h1'
                    textStyle='h3'
                    lineHeight='1.5'
                    flex='1 0 auto'
                    fontWeight={{ base: 'semibold', md: 'normal' }}
                    align={{ base: 'center', sm: 'center', md: 'flex-start' }}
                    textAlign={{ base: 'center', md: 'left' }}
                    my={{ base: 0, md: 2 }}
                    mx={{ base: 1, md: 8, xl: 0 }}
                >
                    <ChakraLink href='/' variant='homeLink'>
                        Survey on Gender Equality at Home
                    </ChakraLink>
                </Heading>
            )}
            <HStack
                spacing={{ base: 5, md: 8 }}
                width='100%'
                maxW='1200px'
                p={{ base: 1, md: 2 }}
                justifyContent={{ base: 'center', md: 'flex-end' }}
                mx='auto'
            >
                <Button
                    height='2.15rem'
                    fontSize={{ base: 'sm', md: 'md', lg: 'md' }}
                    variant='invertedLink'
                    onClick={faqOnOpen}
                >
                    FAQS
                </Button>
                <Button
                    height='2.15rem'
                    variant='invertedLink'
                    fontSize={{ base: 'sm', md: 'md', lg: 'md' }}
                    onClick={aboutOnOpen}
                >
                    About the Survey
                </Button>
                <Button
                    height='2.15rem'
                    variant='invertedLink'
                    fontSize={{ base: 'sm', md: 'md', lg: 'md' }}
                    as={Link}
                    to={ROUTES.SAVED}
                >
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
                p={{ base: 2, md: 4, lg: 8 }}
            >
                {linkBar}
                <Flex width='100%' justify={titleJustify}>
                    <VStack
                        color='white'
                        maxWidth='54rem'
                        m={{
                            base: 2,
                            md: 4,
                        }}
                        p={{
                            base: 2,
                            md: 4,
                        }}
                        textAlign='center'
                    >
                        <Heading as='h1' textStyle='h1'>
                            <Box
                                textStyle='miniTitle'
                                mb={{
                                    base: 2,
                                    md: 0,
                                }}
                            >
                                Dashboard
                            </Box>
                            Survey on Gender Equality at Home
                        </Heading>
                        <Text
                            fontSize={{
                                base: 'md',
                                md: 'lg',
                            }}
                        >
                            Explore the country and region-level data from the
                            July 2020 survey, which reached over 460,000
                            Facebook users in 208 countries, territories, and
                            islands in 80 languages.{' '}
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
