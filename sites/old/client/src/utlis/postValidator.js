export const mapServerPost = (post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    image: post.image,
    date: new Date(post.created_at).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }),
    time: new Date(post.created_at).toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
    }),
});

export const mapServerPostDetail = (post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    image: post.image,
    isoDate: post.created_at,
    date: new Date(post.created_at).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }),
    time: new Date(post.created_at).toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
    }),
    content: post.rich_content,
    courses: post.courses,
});
