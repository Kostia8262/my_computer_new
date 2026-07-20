import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box } from "@mui/material";
import DOMPurify from "dompurify";
import { BlogDetailContent, BlogDetailDescription, BlogDetailHero, BlogDetailImage, BlogDetailTitle, BlogDetailWrapper } from "./BlogDetail.styles";
import { getPostById } from "../../api";
import { mapServerPostDetail } from "../../utlis/postValidator";
import { BlogPageHeader } from "../../shared/ui/BlogPageHeader";
import { PostMeta } from "../../shared/ui/PostMeta/PostMeta";
import { BlogDetailSkeleton } from "./BlogDetailSkeleton";
import { BlogSlider } from "../../widgets/BlogSlider";
import { DataContext } from "../../app/providers/DataProvider";

const DEFAULT_IMAGE = 'https://old.mycomputer.education/og-image.png';

export const BlogDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const { posts } = useContext(DataContext) || [];

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setNotFound(false);
        getPostById(Number(id))
            .then((data) => {
                if (!data) {
                    setNotFound(true);
                    setPost(null);
                } else {
                    setPost(mapServerPostDetail(data));
                }
                setLoading(false);
            })
            .catch(() => {
                setNotFound(true);
                setPost(null);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <BlogDetailSkeleton />;

    if (notFound || !post) {
        return (
            <BlogDetailWrapper>
                <Container>
                    <BlogPageHeader />
                    <Box textAlign="center" py={8}>
                        <Typography variant="h5" component="h1" mb={2}>
                            Статтю не знайдено
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Можливо, її ще не опублікували або вона була видалена.
                        </Typography>
                    </Box>
                </Container>
            </BlogDetailWrapper>
        );
    }

    const postImage = post.image || DEFAULT_IMAGE;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: postImage,
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        url: `https://old.mycomputer.education/posts/${id}/`,
        author: {
            '@type': 'Organization',
            name: "Академія Мій Комп'ютер",
            url: 'https://old.mycomputer.education',
        },
        publisher: {
            '@type': 'Organization',
            name: "Академія Мій Комп'ютер",
            logo: {
                '@type': 'ImageObject',
                url: DEFAULT_IMAGE,
            },
        },
    };

    return (
        <BlogDetailWrapper>
            <Helmet>
                <title>{post.title} | Академія Мій Комп'ютер</title>
                <meta name="description" content={post.description} />
                <meta name="keywords" content={`${post.title}, програмування онлайн, IT навчання, Академія Мій Комп'ютер, курси для дітей`} />
                <link rel="canonical" href={`https://old.mycomputer.education/posts/${id}/`} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://old.mycomputer.education/posts/${id}/`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                <meta property="og:image" content={postImage} />
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
            </Helmet>
            <Container>
                <BlogPageHeader />
                <BlogDetailHero>
                    <BlogDetailImage
                        src={postImage}
                        alt={post.title}
                    />
                    <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="center">
                        <PostMeta date={post.date} time={post.time} fontSize="14px" />
                        <BlogDetailTitle component="h1">
                            {post.title}
                        </BlogDetailTitle>
                        <BlogDetailDescription>
                            {post.description}
                        </BlogDetailDescription>
                    </Box>
                </BlogDetailHero>

                <BlogDetailContent dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || '') }} />
                {posts?.length ? <BlogSlider posts={posts} title={'Статті'}/> : ''}
            </Container>
        </BlogDetailWrapper>
    );
};
