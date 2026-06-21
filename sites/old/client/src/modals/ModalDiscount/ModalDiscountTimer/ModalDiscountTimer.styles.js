import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const TimerWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2, 3),
  justifyContent: 'center',
  alignItems: 'center',
}));

export const TimeBlock = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '78px',
  height: '66x',
  position: 'relative',
  '&:not(:last-child)::before': {
    content: '":"',
    position: 'absolute',
    left: '100%',
    transform: 'translateX(150%)',
  },
}));

export const TimeValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 700,
  color: theme.palette.common.white,
  lineHeight: 1,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

export const TimeLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  color: '#ACACBF',
  marginTop: theme.spacing(0.5),
  textTransform: 'capitalize',
  letterSpacing: 0.5,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));
