import { Card, CardMedia, Typography, Link as MuiLink, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const BlogPostCard = styled(Card)(({ theme }) => ({
    boxSizing: 'border-box',
    padding: theme.spacing(2.5),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    maxWidth: 580,
    height: 300,
    borderRadius: '14px',
    borderTop: `3px solid ${theme.palette.success.main}`,
    transition: '0.3s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0px 0px 24px 0px rgba(255, 181, 6, 0.25)`,
    },
}));

export const BlogPostCardHeader = styled(Box)({
    display: 'flex',
    marginBottom: '16px',
});

export const BlogPostCardMedia = styled(CardMedia)(({ theme }) => ({
    width: '100px',
    height: '100px',
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

export const BlogPostCardTitleWrapper = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '110px',
});

export const BlogPostCardDescription = styled(Typography)({
    height: 62,
    marginBottom: '16px',
    fontSize: '14px',
    lineHeight: '1.5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

export const BlogPostCardLink = styled(Link)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.success.main,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
        color: theme.palette.warning.main,
    },
}));