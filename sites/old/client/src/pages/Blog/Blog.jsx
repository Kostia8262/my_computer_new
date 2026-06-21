import { Box, Container, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { BlogWrapper } from './Blog.styles';
import { BlogPost } from './BlogPost';
import { BlogPostSkeleton } from './BlogPostSkeleton';
import { useContext } from 'react';
import { DataContext } from '../../app/providers/DataProvider';
import { mapServerPost } from '../../utlis/postValidator';
import { NavigateBackButton } from '../../shared/ui/NavigateButton';

export const Blog = () => {
    const posts = useContext(DataContext).posts || [];

    const showSkeletons = posts.length === 0;


    return (
        <BlogWrapper>
            <Helmet>
                <title>Блог | Академія Мій Комп'ютер Дніпро</title>
                <meta name="description" content="Статті про програмування, веб-дизайн та IT від викладачів Академії Мій Комп'ютер у Дніпрі." />
                <link rel="canonical" href="https://mycomputer.education/posts/" />
            </Helmet>
            <Container>
                <Box display="flex" alignItems={'center'} sx={{mb: {xs: 3, md: 5 }}}>
                    <NavigateBackButton />
                    <Typography variant="h5" component="h2" sx={{ marginLeft: {xs:'12px', md:'20px'}, fontSize: { xs:'22px',md:'28px'}, letterSpacing:3,fontWeight: 900, textTransform:'capitalize' }}>
                        Статті
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {showSkeletons
                        ? [...Array(4)].map((_, i) => (
                            <Grid item xs={12} sm={6} key={i}>
                                <BlogPostSkeleton />
                            </Grid>
                        ))
                        : posts.map((post) => (
                            <Grid item xs={12} sm={6} key={post.id}>
                                <BlogPost {...mapServerPost(post)} />
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </BlogWrapper>
    );
};
