import { Box, styled } from "@mui/material";

export const PostdMetaRoot = styled(Box)(({ theme, color }) => ({
    display: 'flex',
    gap: '10px',
    marginBottom: '6px',
    color: color || theme.palette.text.primary,
}));