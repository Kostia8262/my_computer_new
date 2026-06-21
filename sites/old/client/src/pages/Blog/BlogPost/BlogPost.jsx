import { Typography } from '@mui/material';
import { BlogPostCard, BlogPostCardDescription, BlogPostCardHeader, BlogPostCardLink, BlogPostCardMedia, BlogPostCardTitleWrapper} from './BlogPost.styles';
import { PostMeta } from '../../../shared/ui/PostMeta/PostMeta';
import next_chev from '../../../shared/assets/icons/interface/next_chev.svg'

export const BlogPost = ({ id, title, description, image, date, time }) => {
    return (
        <BlogPostCard>
            <BlogPostCardHeader>
                    <BlogPostCardMedia
                        component="img"
                        image={image}
                        alt={title}
                    />
                <BlogPostCardTitleWrapper>
                    <PostMeta date={date} time={time} color='text.secondary' />
                    <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '20px' }}>
                        {title}
                    </Typography>
                </BlogPostCardTitleWrapper>
            </BlogPostCardHeader>

            <BlogPostCardDescription variant="body1" color="text.primary">
                {description}
            </BlogPostCardDescription>
            <BlogPostCardLink to={`/posts/${id}`} variant="body2" color="text.secondary">
                Читати <span style={{ marginLeft: '5px', position: 'relative', top: 2 }}><img src={next_chev}/></span>
            </BlogPostCardLink>
        </BlogPostCard>
    );
};