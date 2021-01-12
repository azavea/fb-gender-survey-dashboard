import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    Link,
} from '@chakra-ui/react';

export const StyledAccordionItem = ({ title, children }) => (
    <AccordionItem>
        <AccordionButton>
            <Box flex='1' textAlign='left' fontWeight={500}>
                {title}
            </Box>
            <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={4}>{children}</AccordionPanel>
    </AccordionItem>
);

export const StyledLink = ({ href, title }) => (
    <Link href={href} textDecoration='underline' isExternal>
        {title}
    </Link>
);

export const StyledText = ({ children }) => <Text p={2}>{children}</Text>;
