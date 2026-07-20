import { Box, styled } from "@mui/material";

export const BlogPageHeaderRoot = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3),
    },
}));

export const BlogPageHeaderIcon = styled(Box)(({ theme }) => ({
    height: '44px',
    width: '44px',
    flexShrink: 0,
    background: 'linear-gradient(244.59deg, #FFE100 -0.06%, #FFB700 48.63%, #FFE100 99.95%)',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(2.5),
    '& img': {
        height: '24px',
        width: '24px',
    },
    [theme.breakpoints.down('sm')]: {
        height: '36px',
        width: '36px',
        marginRight: theme.spacing(1.5),
        '& img': {
            height: '20px',
            width: '20px',
        },
    },
}));

export const BlogPageHeaderTitle = styled('h2')(({ theme }) => ({
    margin: 0,
    fontSize: '28px',
    fontWeight: 900,
    letterSpacing: '1px',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '21px',
    },
}));

export const BlogPageHeaderSubtitle = styled('p')(({ theme }) => ({
    margin: theme.spacing(0.5, 0, 0),
    fontSize: '15px',
    color: theme.palette.text.secondary,
}));
