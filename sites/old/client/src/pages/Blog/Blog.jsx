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
    const posts = useContext(DataContext).posts;

    const isLoading = posts === null || posts === undefined;
    const isEmpty = !isLoading && posts.length === 0;


    return (
        <BlogWrapper>
            <Helmet>
                <title>Блог про програмування та IT | Академія Мій Комп'ютер</title>
                <meta name="description" content="Статті про програмування, веб-дизайн та IT від викладачів Академії Мій Комп'ютер. Корисні поради для дітей, батьків та початківців." />
                <meta name="keywords" content="блог програмування, статті про IT, програмування для дітей, веб-дизайн навчання, Академія Мій Комп'ютер, IT поради" />
                <link rel="canonical" href="https://old.mycomputer.education/posts/" />
                <meta property="og:url" content="https://old.mycomputer.education/posts/" />
                <meta property="og:title" content="Блог про програмування та IT | Академія Мій Комп'ютер" />
                <meta property="og:description" content="Статті про програмування, веб-дизайн та IT від викладачів Академії Мій Комп'ютер." />
                <meta property="og:image" content="https://old.mycomputer.education/og-image.png" />
            </Helmet>
            <Container>
                <Box display="flex" alignItems={'center'} sx={{mb: {xs: 3, md: 5 }}}>
                    <NavigateBackButton />
                    <Typography variant="h5" component="h2" sx={{ marginLeft: {xs:'12px', md:'20px'}, fontSize: { xs:'22px',md:'28px'}, letterSpacing:3,fontWeight: 900, textTransform:'capitalize' }}>
                        Статті
                    </Typography>
                </Box>

                {isEmpty ? (
                    <Box textAlign="center" py={8}>
                        <Typography variant="h6" color="text.secondary">
                            Статей поки немає. Зазирайте пізніше!
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        {isLoading
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
                )}
            </Container>
        </BlogWrapper>
    );
};
