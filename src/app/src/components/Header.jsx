import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Button,
    HStack,
    Flex,
    Heading,
    Text,
    VStack,
    useDisclosure,
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
        <Flex justify='flex-end' width='100%'>
            <HStack spacing='35px' p='2'>
                <Button color='white' variant='link'>
                    Saved Charts
                </Button>
                <Button color='white' variant='link' onClick={faqOnOpen}>
                    FAQS
                </Button>
                <Button color='white' variant='link' onClick={aboutOnOpen}>
                    About the Survey
                </Button>
            </HStack>
        </Flex>
    );
    const title = (
        <Heading fontWeight='light'>Dashboard: Gender Equality at Home</Heading>
    );
    return (
        <VStack as='header' className='App-header' bg='black' py='2'>
            {linkBar}
            <Flex py='2' width='100%' justify={titleJustify}>
                <VStack color='white'>
                    {title}
                    {isLargeFormat && (
                        <Text>
                            How to use the dashboard and nullam quis risus eget
                            urna mollis ornare vel eu leo. 208 countries &
                            islands and 80 languages. Maecenas faucibus mollis.
                        </Text>
                    )}
                </VStack>
                <FaqModal isOpen={faqIsOpen} onClose={faqOnClose} />
                <AboutModal isOpen={aboutIsOpen} onClose={aboutOnClose} />
            </Flex>
        </VStack>
    );
};

export default Header;
