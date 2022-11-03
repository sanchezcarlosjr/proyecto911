import { defaultTheme } from 'react-admin';

export const theme = {
    ...defaultTheme,
    palette: {
        primary: {
            main: '#00723F'
        },
        secondary: {
            light: '#DD971A',
            main: '#DD971A',
            dark: '#DD971A',
            contrastText: '#fff'
        },
        error: {
            main: '#af3c0b',
        },
        warning: {
            main: '#AF870B',
        },
        info: {
            main: '#20419A',
        },
        background: {
            default: '#fcfcfe',
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#00723F'
                }
            }
        }
    },
    typography: {
        fontFamily: '"Noto Sans", "Monserrat", Arial, sans-serif',
    }
};
