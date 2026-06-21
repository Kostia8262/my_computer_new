import { Skeleton } from '@mui/material';
import { BlogPostCard, BlogPostCardHeader, BlogPostCardTitleWrapper, BlogPostCardDescription } from '../BlogPost/BlogPost.styles';
import { PostMeta } from '../../../shared/ui/PostMeta/PostMeta';

export const BlogPostSkeleton = () => {
    return (
        <BlogPostCard>
            <BlogPostCardHeader>
                <Skeleton variant="rectangular" width={100} height={100} style={{ marginRight: 15, borderRadius: 8 }} />
                <BlogPostCardTitleWrapper>
                    <Skeleton variant="text" width={100} height={20} sx={{ mb: 1 }} />{}
                    <Skeleton width="100%" height={30} />
                </BlogPostCardTitleWrapper>
            </BlogPostCardHeader>
            <BlogPostCardDescription>
                <Skeleton width="100%" height={20} style={{ marginBottom: 6 }} />
                <Skeleton width="90%" height={20} />
            </BlogPostCardDescription>
            <Skeleton width={120} height={20} />
        </BlogPostCard>
    );
};
