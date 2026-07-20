import { Box, Typography, styled } from "@mui/material";

export const BlogDetailWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    color: theme.palette.text.primary,
    minHeight: 'calc(100vh - 369px)',
    [theme.breakpoints.down('md')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
}));

export const BlogDetailHero = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(4),
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    borderRadius: '20px',
    background: `linear-gradient(155deg, ${theme.palette.background.paper} 0%, #2b2c48 100%)`,
    border: '1px solid rgba(255, 181, 6, 0.15)',
    boxShadow: '0px 20px 40px -20px rgba(0, 0, 0, 0.4)',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: theme.spacing(2.5),
        gap: theme.spacing(2.5),
    },
}));

export const BlogDetailImage = styled('img')(({ theme }) => ({
    width: '260px',
    height: '260px',
    flexShrink: 0,
    objectFit: 'cover',
    borderRadius: '16px',
    boxShadow: '0px 12px 30px -10px rgba(0, 0, 0, 0.5)',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '220px',
    },
}));

export const BlogDetailTitle = styled(Typography)(({ theme }) => ({
    fontSize: '32px',
    fontWeight: 800,
    lineHeight: 1.25,
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
    },
}));

export const BlogDetailDescription = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    lineHeight: 1.6,
    color: theme.palette.text.secondary,
}));

export const BlogDetailContent = styled(Box)(({ theme }) => ({
    maxWidth: '760px',
    margin: '0 auto',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    fontSize: '17px',
    lineHeight: 1.8,
    color: theme.palette.text.primary,

    '& p': {
        margin: theme.spacing(2.5, 0),
    },
    '& h2': {
        fontSize: '26px',
        fontWeight: 800,
        lineHeight: 1.3,
        margin: theme.spacing(5, 0, 2),
        color: theme.palette.text.primary,
        [theme.breakpoints.down('sm')]: {
            fontSize: '21px',
        },
    },
    '& h3': {
        fontSize: '21px',
        fontWeight: 700,
        lineHeight: 1.35,
        margin: theme.spacing(4, 0, 1.5),
        color: theme.palette.text.primary,
        [theme.breakpoints.down('sm')]: {
            fontSize: '19px',
        },
    },
    '& h4, & h5, & h6': {
        fontSize: '18px',
        fontWeight: 700,
        margin: theme.spacing(3, 0, 1.5),
        color: theme.palette.text.primary,
    },
    '& strong, & b': {
        color: theme.palette.success.main,
        fontWeight: 700,
    },
    '& a': {
        color: theme.palette.success.main,
        textDecoration: 'none',
        borderBottom: `1px solid rgba(255, 181, 6, 0.4)`,
        transition: '0.2s',
        '&:hover': {
            color: theme.palette.warning.main,
            borderBottomColor: theme.palette.warning.main,
        },
    },
    '& ul, & ol': {
        margin: theme.spacing(2.5, 0),
        paddingLeft: theme.spacing(3),
    },
    '& li': {
        marginBottom: theme.spacing(1.25),
        paddingLeft: theme.spacing(0.5),
    },
    '& li::marker': {
        color: theme.palette.success.main,
        fontWeight: 700,
    },
    '& blockquote': {
        margin: theme.spacing(3, 0),
        padding: theme.spacing(2, 3),
        borderLeft: `3px solid ${theme.palette.success.main}`,
        borderRadius: '4px',
        background: 'rgba(255, 181, 6, 0.06)',
        fontStyle: 'italic',
        color: theme.palette.text.secondary,
    },
    '& img': {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '14px',
        margin: theme.spacing(3, 0),
        boxShadow: '0px 12px 30px -10px rgba(0, 0, 0, 0.5)',
    },
    '& code': {
        fontFamily: "'Courier New', monospace",
        background: 'rgba(255, 255, 255, 0.08)',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '0.9em',
    },
    '& hr': {
        border: 'none',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        margin: theme.spacing(4, 0),
    },
    '& table': {
        width: '100%',
        borderCollapse: 'collapse',
        margin: theme.spacing(3, 0),
        fontSize: '15px',
    },
    '& th, & td': {
        padding: theme.spacing(1.25, 1.5),
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'left',
    },
    '& th': {
        background: 'rgba(255, 181, 6, 0.08)',
        fontWeight: 700,
    },
}));
