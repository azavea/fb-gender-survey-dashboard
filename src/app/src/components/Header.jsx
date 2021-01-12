import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    Button,
    HStack,
    Flex,
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
                    align='flex-start'
                    fontWeight='500'
                    color='white'
                    maxWidth='790px'
                    fontSize='22px'
                    m={4}
                >
                    Survey on Gender Equality at Home
                </Heading>
            ) : (
                <Spacer />
            )}
            <HStack spacing='35px' p='2' mr={4}>
                <Button color='white' variant='link' onClick={faqOnOpen}>
                    FAQS
                </Button>
                <Button color='white' variant='link' onClick={aboutOnOpen}>
                    About the Survey
                </Button>
                <Button
                    color='white'
                    variant='link'
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
                className='App-header'
                bg='linear-gradient(-225deg, rgb(26, 43, 51) 0%, rgb(1, 16, 23) 100%)'
                py='2'
            >
                {linkBar}
                <Flex py='2' width='100%' justify={titleJustify}>
                    <VStack color='white' maxWidth='790px' m={4} spacing={4}>
                        <Text casing='uppercase'>Dashboard</Text>
                        <Heading fontWeight='light'>
                            Survey on Gender Equality at Home
                        </Heading>
                        <Text fontSize='18px'>
                            Explore the aggregate data of the Survey on Gender
                            Equality at Home issued in July 2020 in over 80
                            languages to more than 460,000 Facebook users in all
                            world regions.{' '}
                            <ChakraLink
                                href='https://data.humdata.org/dataset/survey-on-gender-equality-at-home'
                                color='#f3a48e'
                                isExternal
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
