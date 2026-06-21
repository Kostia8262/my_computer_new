import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BlogWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    color: theme.palette.text.primary,
    minHeight: 'calc(100vh - 273px)',
    boxSizing:'border-box',
    [theme.breakpoints.down('md')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
        minHeight: 'calc(100vh - 63px)',
    },
}));