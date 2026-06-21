import { Box, Typography } from '@mui/material';
import { flexbox, styled } from '@mui/system';

export const BannerWrapper = styled(Box)(({ theme }) => ({
    padding: '0 0 50px',
    [theme.breakpoints.down('sm')]: {
        // padding: '0 0 15px',
    },
}));

export const BannerContent = styled(Box)(({ theme }) => ({
    height: '60px',
    boxSizing: 'border-box',
    padding: '19px 50px',
    backgroundColor: 'var(--yellow-background)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        height: 'auto',
        padding: '15px',
    },
}));

export const BannerIcon = styled(Box)(({ theme }) => ({
    width: '30px',
    height: '30px',
    backgroundColor: 'var(--background)',
    color: 'var(--yellow)',
    borderRadius: '2px',
    fontWeight: 900,
    fontSize: '20px',
    lineHeight: '30px',
    marginRight: '15px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        flexShrink: 0,
    },
}));

export const BannerText = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    color: 'var(--background)',
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
    },
}));
