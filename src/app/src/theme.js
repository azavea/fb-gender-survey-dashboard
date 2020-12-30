import { extendTheme } from '@chakra-ui/react';

const Accordion = {
    baseStyle: {
        container: {
            bg: 'white',
            borderTopWidth: '0',
            borderColor: 'transparent',
            marginBottom: '3',
            _last: {
                borderBottomWidth: '0',
            },
        },
        button: {
            _hover: {
                bg: 'gray.100',
            },
        },
        panel: {
            pt: 4,
            px: 16,
            pb: 8,
        },
    },
};

const Button = {
    baseStyle: {
        fontWeight: 'normal',
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
                color: 'white',
                bg: 'gray.500',
            },
            _hover: {
                bg: '#f3d9d1',
                _disabled: {
                    color: 'white',
                    bg: 'gray.500',
                },
            },
            _active: {
                color: '#1d0400',
                bg: '#f3a28c',
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
    },
    sizes: {
        xl: {
            control: { w: 6, h: 6 },
            label: { fontSize: 'xl', fontWeight: 'regular' },
            icon: { fontSize: '0.875rem' },
        },
    },
};

const theme = extendTheme({
    components: {
        Accordion,
        Button,
        Checkbox,
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
                peach: {
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
                    50: '#edf3fa',
                    100: '#d1d8e0',
                    200: '#b5bfc9',
                    300: '#97a8b4',
                    400: '#79919e',
                    500: '#607b85',
                    600: '#4a6268',
                    700: '#35474a',
                    800: '#1f2d2e',
                    900: '#041311',
                },
                red: {
                    50: '#ffe5e9',
                    100: '#f9bcc2',
                    200: '#ee9299',
                    300: '#e56672',
                    400: '#dd3c4a',
                    500: '#c32230',
                    600: '#991925',
                    700: '#6d101a',
                    800: '#44070e',
                    900: '#1e0001',
                },
            },
            body: {
                bg: 'gray.50',
            },
            a: {
                color: 'teal.500',
                _hover: {
                    textDecoration: 'underline',
                },
            },
        },
    },
});

export default theme;
