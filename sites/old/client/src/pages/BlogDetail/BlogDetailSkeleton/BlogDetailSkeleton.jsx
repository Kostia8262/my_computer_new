import { Box, Container, Skeleton, Typography } from "@mui/material";
import { BlogDetailWrapper } from "../BlogDetail.styles";
import { NavigateBackButton } from "../../../shared/ui/NavigateButton";


export const BlogDetailSkeleton = () => {
    return (
        <BlogDetailWrapper>
            <Container>
                <Box display="flex" marginBottom={5}>
                    <NavigateBackButton />
                    <Typography variant="h4" component="h1" style={{ marginLeft: '32px', fontWeight: 900, textTransform: 'capitalize' }}>
                        Статті
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={3}>
                    <Skeleton variant="rectangular" width={220} height={220} sx={{ borderRadius: 2, mr:5 }} />
                    <Box flexGrow={1} ml={2}>
                        <Skeleton variant="text" width={100} height={20} sx={{ mb: 1 }} />
                        <Skeleton variant="text" width="80%" height={32} sx={{ mb: 2 }} />
                        <Skeleton variant="text" width="100%" height={20} />
                        <Skeleton variant="text" width="90%" height={20} />
                        <Skeleton variant="text" width="95%" height={20} />
                    </Box>
                </Box>
                <Box>
                    <Skeleton variant="text" width="100%" height={30} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="100%" height={30} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="100%" height={30} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="80%" height={30} />
                </Box>
            </Container>
        </BlogDetailWrapper>
    );
};
