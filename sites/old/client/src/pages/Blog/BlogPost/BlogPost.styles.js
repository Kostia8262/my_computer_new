import { Card, CardMedia, Typography, Link as MuiLink, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const BlogPostCard = styled(Card)(({ theme }) => ({
    boxSizing: 'border-box',
    padding: theme.spacing(2.5),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    maxWidth: 580,
    height: 300,
    borderRadius: '12px',
}));

export const BlogPostCardHeader = styled(Box)({
    display: 'flex',
    marginBottom: '20px',
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
    height:'115px',
});

export const BlogPostCardDescription = styled(Typography)({
    height: 70,
    marginBottom: '20px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

export const BlogPostCardLink = styled(Link)(({ theme }) => ({
    color: theme.palette.warning.main,
    textDecoration: 'none',
    cursor: 'pointer',
}));