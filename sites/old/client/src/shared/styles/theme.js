import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#242538', // Основной фон
            paper: '#343552', // Темно-синий фон
        },
        primary: {
            main: '#3F4281', // Синий текст
        },
        secondary: {
            main: '#8588C8', // Светло-синий
        },
        text: {
            primary: '#fff', // Белый текст
            secondary: '#b0b0b0', // Светло-серый текст
        },
        warning: {
            main: '#FFFF00', // Желтый
        },
        success: {
            main: '#FFB506', // Золотой
        },
    },
    typography: {
        fontFamily: "'Nunito', sans-serif",
        h1: {
            fontSize: '35px',
            fontWeight: 900,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#fff',
        },
        h2: {
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: '38px',
            color: '#fff',
        },
        body1: {
            fontSize: '16px',
            lineHeight: '1.5em',
            color: '#fff',
        },
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) => ({
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    [theme.breakpoints.up('sm')]: {
                        paddingLeft: '15px',
                        paddingRight: '15px',
                    },
                }),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '5px',
                    padding: '14px 12px',
                    backgroundColor: '#FFE500',
                    color: '#242538',
                    transition: '0.3s',
                    '&:hover': {
                        boxShadow: '0px 0px 12px 0px rgba(246, 163, 0, 0.50)',
                        backgroundColor: '#FFB800',
                    },
                    '&:active': {
                        backgroundColor: '#F6A300',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: '5px',
                    padding: '18px 20px',
                    border: '1px solid #b0b0b0',
                    '&:focus': {
                        border: '1px solid #FFB506 !important',
                    },
                    '&:invalid': {
                        border: '1px solid #D91B1B !important',
                        color: '#D91B1B',
                    },
                },
            },
        },
    },
});

export default theme;
