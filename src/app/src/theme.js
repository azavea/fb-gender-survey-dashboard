import { extendTheme } from '@chakra-ui/react';

const Accordion = {
    baseStyle: {
        container: {
            bg: 'white',
            borderTopWidth: '0',
            borderColor: 'transparent',
            marginBottom: '3',
            borderRadius: 'sm',
            _last: {
                borderBottomWidth: '0',
            },
        },
        button: {
            borderRadius: 'sm',
            _hover: {
                boxShadow: 'base',
                bg: 'white',
                '.chakra-icon': {
                    bg: 'gray.75',
                    color: 'gray.800',
                    borderRadius: '100%',
                },
            },
        },
    },
};

const Button = {
    baseStyle: {
        fontWeight: 'medium',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        borderRadius: 'sm',
        _disabled: {
            bg: 'gray.500',
        },
        _hover: {
            _disabled: {
                bg: 'gray.500',
            },
        },
    },
    variants: {
        link: {
            overflow: 'visible',
            color: 'gray.900',
            lineHeight: '1.5',
            fontWeight: 'medium',
            textDecoration: 'none',
            '&.current': {
                backgroundImage:
                    'linear-gradient(to bottom, transparent, #000)',
                backgroundPosition: '0 1.45em',
                backgroundRepeat: 'repeat-x',
                backgroundSize: '1px 1px',
            },
            _hover: {
                textDecoration: 'none',
                backgroundImage:
                    'linear-gradient(to bottom, transparent, #000)',
                backgroundPosition: '0 1.45em',
                backgroundRepeat: 'repeat-x',
                backgroundSize: '1px 1px',
                transition: 'none',
                _disabled: {
                    backgroundImage: 'none',
                },
            },
        },
        invertedLink: {
            p: 0,
            color: 'white',
            overflow: 'visible',
            lineHeight: '1.5',
            fontWeight: 'medium',
            textDecoration: 'none',
            _hover: {
                textDecoration: 'none',
                backgroundImage:
                    'linear-gradient(to bottom, transparent, #fff)',
                backgroundPosition: '0 2em',
                backgroundRepeat: 'repeat-x',
                backgroundSize: '1px 1px',
                transition: 'none',
                _disabled: {
                    backgroundImage: 'none',
                },
            },
        },
        solid: {
            _hover: {
                _disabled: {
                    bg: 'gray.500',
                },
            },
        },
        peach: {
            bg: '#ffeae3',
            color: '#73230c',
            _focus: {
                boxShadow: 'outline',
            },
            _disabled: {
                color: '#1d0400',
                bg: '#ffeae3',
            },
            _hover: {
                bg: '#f3d9d1',
                _disabled: {
                    color: '#1d0400',
                    bg: '#ffeae3',
                },
            },
            _active: {
                color: '#1d0400',
                bg: '#f3a28c',
            },
        },
    },
};

const Breadcrumb = {
    parts: ['link'],
    baseStyle: {
        link: {
            mr: 2,
            bg: 'gray.700',
            fontWeight: '600',
            fontSize: 'sm',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'white',
            borderRadius: 'sm',
            px: 2,
            py: 1,
            textDecoration: 'none',
            _focus: {
                boxShadow: 'outline',
            },
            _disabled: {
                bg: 'gray.700',
                color: 'white',
                opacity: 0.35,
            },
            _hover: {
                bg: 'gray.800',
                textDecoration: 'none',
                _disabled: {
                    bg: 'gray.700',
                    color: 'white',
                },
            },
            _active: {
                bg: 'black',
                color: 'white',
            },
        },
    },
};

const Checkbox = {
    baseStyle: {
        label: {
            alignItems: 'flex-start',
            lineHeight: '1.25',
        },
        control: {
            bg: 'white',
            _disabled: {
                bg: 'gray.200',
            },
        },
    },
    sizes: {
        xl: {
            control: { w: 6, h: 6 },
            label: { fontSize: 'xl', fontWeight: 'regular' },
            icon: { fontSize: '0.875rem' },
        },
    },
};

const Link = {
    baseStyle: {
        color: 'red.600',
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
        textDecorationThickness: '1px',
        borderRadius: '4px',
        _focus: {
            boxShadow: 'outline',
        },
    },
    variants: {
        inverted: {
            color: 'peach.200',
        },
        homeLink: {
            color: 'white',
            textDecoration: 'none',
            lineHeight: '1.5',
            _hover: {
                textUnderlineOffset: '2px',
                textDecorationThickness: '1px',
            },
        },
    },
};

const theme = extendTheme({
    components: {
        Accordion,
        Button,
        Breadcrumb,
        Checkbox,
        Link,
    },
    colors: {
        peach: {
            25: '#fff9f7',
            50: '#ffeae3',
            100: '#f3d9d1',
            200: '#f3a28c',
            300: '#ed7e5f',
            400: '#e85932',
            500: '#ce4018',
            600: '#a03212',
            700: '#73230c',
            800: '#461405',
            900: '#1d0400',
        },
        gray: {
            50: '#f8f9fb',
            75: '#f6f6f7',
            100: '#d1d8e0',
            200: '#b5bfc9',
            300: '#97a8b4',
            400: '#79919e',
            500: '#556d76',
            600: '#48565c',
            700: '#27373f',
            800: '#1f2d2e',
            900: '#041311',
        },
        red: {
            50: '#ffe5e9',
            100: '#f9bcc2',
            200: '#ee9299',
            300: '#e56672',
            400: '#dd3c4a',
            500: '#c02b38',
            600: '#991925',
            700: '#6d101a',
            800: '#44070e',
            900: '#1e0001',
        },
    },
    textStyles: {
        h1: {
            fontSize: ['36px', '54px'],
            fontWeight: 'light',
            lineHeight: '1.1',
        },
        h2: {
            fontSize: ['24px', '36px'],
            fontWeight: 'light',
            lineHeight: '1.2',
        },
        h3: {
            fontSize: ['18px', '24px'],
            fontWeight: 'light',
            lineHeight: '1.2',
        },
        h4: {
            fontSize: ['16px', '18px'],
            fontWeight: 'medium',
            lineHeight: '1.2',
        },
        h5: {
            fontSize: ['14px', '16px'],
            fontWeight: 'bold',
            lineHeight: '1.2',
        },
        miniTitle: {
            fontSize: '16px',
            fontWeight: 'medium',
            letterSpacing: '1px',
            textTransform: 'uppercase',
        },
    },
    layerStyles: {
        selector: {
            bg: 'white',
            borderBottom: '1px solid',
            borderColor: 'gray.100',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 4,
            px: { base: 4, md: 4, lg: 8 },
        },
        savedVizButton: {
            bg: 'white',
            borderRadius: 'sm',
            border: 'none',
            mb: 2,
            py: { base: 1, md: 2, lg: 4 },
            px: { base: 4, md: 4, lg: 8 },
            _hover: {
                boxShadow: 'base',
                h2: {
                    textDecoration: 'underline',
                    textDecorationThickness: '1px',
                    textUnderlineOffset: '2px',
                },
                '.arrow-button': {
                    bg: 'gray.100',
                },
            },
        },
    },
    styles: {
        global: {
            colors: {
                brand: {
                    lightPink: '#f3d9d1',
                    pink: '#F3A48E',
                    brightRed: '#dc3846',
                    red: '#A23037',
                    maroon: '#dc3846',
                },
            },
            body: {
                bg: 'gray.75',
            },
            a: {
                color: 'brand.lightPink',
                textDecoration: 'underline',
                borderRadius: '4px',
                _hover: {
                    opacity: '0.85',
                },
                _active: {
                    opacity: '0.7',
                },
                _focus: {
                    boxShadow: 'outline',
                },
            },
        },
    },
});

export default theme;
