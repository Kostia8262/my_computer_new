import { Dialog, DialogContent, Button, styled, Typography, Box, DialogTitle } from '@mui/material';
import { NavigateButton } from '../../shared/ui/NavigateButton';

export const ModalContainer = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'radial-gradient(circle at 6% 6%, #3E4184, #2A2B4A 99%)',
    color: '#fff',
    borderRadius: theme.spacing(2.5),
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'row',
    height: '600px',
    maxWidth: '800px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 'auto',
      maxHeight: '90vh',
      maxWidth: '90vw',
    },
  },
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexBasis: '360px',
  flexShrink: 0,
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    height: '200px',
    flexBasis: 'auto',
  },
}));

export const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '440px',
  boxSizing: 'border-box',
  padding: '40px 16px 40px 32px',
  flexShrink: 1,
  flexGrow: 0,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '24px 16px',
  },
}));

export const TitleWrapper = styled(DialogTitle)(({ theme })=>({
  padding: 0,
  paddingRight: '16px',
  marginBottom: '12px',
  [theme.breakpoints.down('sm')]: {
    padding: '0',
  },
}));

export const Title = styled(Typography)(({ theme })=>({
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: 1,
    margin: '0 8px 8px 0',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.25rem',
        margin: '0 0 8px 0',
    },
}));

export const Details = styled(DialogContent)(({ theme })=>({
  display: 'flex',
  flexDirection: 'column',
    padding: '0 16px 0 0',
   [theme.breakpoints.down('sm')]: {
        padding: '0',
    },
}));

export const Description = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
    marginBottom: theme.spacing(3.5),
  textAlign: 'justify',
}));

export const Bonus = styled(Box)({
  marginBottom: '8px',
  width: '250px',
  display: 'flex',
  justifyContent: 'space-between',
  '& > strong': {
    color: '#ffd700',
  },
});

export const BonusCode = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3.5),
  width: '250px',
  display: 'flex',
  justifyContent: 'space-between',
  '& > strong': {
    color: '#ffd700',
  },
}));

export const ModalButton = styled(Button)(({ theme }) => ({
  width: '100%',
  fontSize: '0.875rem',
  textTransform: 'capitalize',
  fontWeight: 700,
  marginTop: '28px',
  paddingTop: '12px',
  paddingBottom: '12px',
  [theme.breakpoints.down('sm')]: {
    marginTop: '16px',
  },
}));

export const ModalActions = styled(Box)(({ theme }) => ({
  marginRight: '16px',
    [theme.breakpoints.down('sm')]: {
        marginRight: '0',
  },
}));


export const ModalButtonClose = styled(NavigateButton)(({ theme }) => ({
  height: '44px',
  width: '44px',
  minWidth: '44px',
  backgroundColor: '#FFE500',
  color: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  '&:hover':{
    backgroundColor: "#FFB800",
  },
    [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        top: theme.spacing(3),
        right: theme.spacing(3),
    },
}));