import { Box, styled } from "@mui/material";

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


export const BlogDetailImage = styled('img')(({ theme }) => ({
    width: '220px',
    height: '220px',
    objectFit: 'cover',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        height:'auto',
    }
}));

export const BlogDetailHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent:"space-between",
    marginBottom: 0,
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3),
        flexDirection:'column',
    }
}))


export const BlogDetailContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    '& *': {
        fontSize: '1rem',
        margin: theme.spacing(2, 0),
        color: theme.palette.text.primary,
        lineHeight: 1.6,
    },
    '& a': {
        color: theme.palette.warning.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    '& ul, & ol': {
        paddingLeft: theme.spacing(4),
    },
    '& li': {
        marginBottom: theme.spacing(1),
    },
}));