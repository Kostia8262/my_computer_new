import { styled,Button } from "@mui/material";

export const NavigateButtonRoot = styled(Button)(({theme})=>({
    width: '30px',
    height: '30px',
    minWidth: '30px',
    color: theme.palette.text.primary,
    textTransform: 'capitalize',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
    },
    '& .MuiButton-startIcon': {
        margin: 0,
    },
    '& .MuiButton-startIcon svg': {
        fontSize: '14px',
    },
}))