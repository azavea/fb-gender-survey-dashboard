import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Heading,
    Text,
    Link,
} from '@chakra-ui/react';

export const StyledAccordionItem = ({ title, children }) => (
    <AccordionItem mb={6}>
        <AccordionButton
            p={0}
            sx={{
                _hover: {
                    boxShadow: 'none',
                    h2: {
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px',
                        textDecorationThickness: '1px',
                    },
                },
            }}
        >
            <Heading
                as='h2'
                size='md'
                flex='1'
                textAlign='left'
                fontWeight={400}
            >
                {title}
            </Heading>
            <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p='0'>{children}</AccordionPanel>
    </AccordionItem>
);

export const StyledLink = ({ href, title }) => (
    <Link href={href} textDecoration='underline' isExternal>
        {title}
    </Link>
);

export const StyledText = ({ children }) => <Text p={2}>{children}</Text>;
