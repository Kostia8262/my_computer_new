import { Box, styled } from "@mui/material";

export const PostdMetaRoot = styled(Box)(({ theme, color, fontSize }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
    fontSize: fontSize || '16px',
    color: color || theme.palette.text.primary,
    '& img': {
        width: '16px',
        height: '16px',
    },
}));