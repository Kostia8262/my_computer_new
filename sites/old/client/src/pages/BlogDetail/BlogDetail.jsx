import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box } from "@mui/material";
import { BlogDetailContent, BlogDetailHeader, BlogDetailImage, BlogDetailWrapper } from "./BlogDetail.styles";
import { getPostById } from "../../api";
import { mapServerPostDetail } from "../../utlis/postValidator";
import { NavigateBackButton } from "../../shared/ui/NavigateButton";
import { PostMeta } from "../../shared/ui/PostMeta/PostMeta";
import { BlogDetailSkeleton } from "./BlogDetailSkeleton";
import { BlogSlider } from "../../widgets/BlogSlider";
import { DataContext } from "../../app/providers/DataProvider";


export const BlogDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const { posts } = useContext(DataContext) || [];

    useEffect(() => {
        if (!id) return;
        getPostById(Number(id)).then((data) => {
            setPost(mapServerPostDetail(data));
            setLoading(false);
        });
    }, [id]);

    if (loading) return <BlogDetailSkeleton />;

    if (!post) return null;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: post.image || 'https://mycomputer.education/og-image.png',
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        url: `https://mycomputer.education/posts/${id}/`,
        author: {
            '@type': 'Organization',
            name: "Академія Мій Комп'ютер",
            url: 'https://mycomputer.education',
        },
        publisher: {
            '@type': 'Organization',
            name: "Академія Мій Комп'ютер",
            logo: {
                '@type': 'ImageObject',
                url: 'https://mycomputer.education/og-image.png',
            },
        },
    };

    return (
        <BlogDetailWrapper>
            <Helmet>
                <title>{post.title} | Академія Мій Комп'ютер Дніпро</title>
                <meta name="description" content={post.description} />
                <meta name="keywords" content={`${post.title}, програмування Дніпро, IT навчання, Академія Мій Комп'ютер, курси для дітей`} />
                <link rel="canonical" href={`https://old.mycomputer.education/posts/${id}/`} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://old.mycomputer.education/posts/${id}/`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                {post.image && <meta property="og:image" content={post.image} />}
                <script type="application/ld+json">{JSON.stringify({
                    ...articleSchema,
                    url: `https://old.mycomputer.education/posts/${id}/`,
                    author: { '@type': 'Organization', name: "Академія Мій Комп'ютер", url: 'https://old.mycomputer.education' },
                    publisher: { '@type': 'Organization', name: "Академія Мій Комп'ютер", logo: { '@type': 'ImageObject', url: 'https://old.mycomputer.education/og-image.png' } },
                })}</script>
            </Helmet>
            <Container>
                <Box display="flex" alignItems={'center'} sx={{mb: {xs: 3, md: 5 }}}>
                    <NavigateBackButton />
                    <Typography variant="h5" component="h2" sx={{ marginLeft: { xs:'12px',md:'20px'}, fontSize: { xs:'22px',md:'28px'}, letterSpacing:3, fontWeight: 900, textTransform:'capitalize' }}>
                        Статті
                    </Typography>
                </Box>
                <BlogDetailHeader>
                    <BlogDetailImage
                        src={post.image}
                        alt={post.title}
                    />
                    <Box flexGrow={1} ml={2}>
                        <PostMeta date={post.date} time={post.time} />
                        <Typography component="h1" mb={2}>
                            {post.title}
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            {post.description}
                        </Typography>
                    </Box>
                </BlogDetailHeader>

                <BlogDetailContent dangerouslySetInnerHTML={{ __html: post.content }} />
                {posts?.length ? <BlogSlider posts={posts} title={'Статті'}/> : ''}
            </Container>
        </BlogDetailWrapper>
    );
};
