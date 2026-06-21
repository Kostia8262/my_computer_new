import { Box, Typography } from '@mui/material';
import ArrowNextIosNewIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';

import { mapServerPost } from '../../utlis/postValidator';
import { BlogPost } from '../../pages/Blog/BlogPost';
import { NavigateButton } from '../../shared/ui/NavigateButton';

import file from '../../shared/assets/icons/interface/file.svg'
import { useNavigate } from 'react-router-dom';

export const BlogSlider = ({ posts, title, showAllBtn = true }) => {
    const navigate = useNavigate()
    return (
        <Box className="blog-detail-slider" sx={{ paddingTop: 2, paddingBottom:2 }}>
            <Box display={'flex'} justifyContent='space-between' alignItems='center' mb={4}>
                <Box className="section__heading" sx={{margin:0,alignItems:'center'}} >
                    <Box className="heading__icon">
                        <img src={file} alt="" />
                    </Box>
                <Typography variant="h4" color='text.primary' sx={{ fontSize: 28, fontWeight: 'bold' }}>
                    {title}
                </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap:1.5 }}>
                    <NavigateButton className="swipper-prev-button" startIcon={<ArrowBackIosNewIcon/>} />
                    <NavigateButton className="swipper-next-button" startIcon={<ArrowNextIosNewIcon />} />
                    {showAllBtn ? <NavigateButton sx={{minWidth:'50px',marginLeft:1}} onClick={() => navigate('/posts')}>Всі</NavigateButton>:''}
                </Box>
            </Box>
            <Box sx={{ overflow: 'hidden' }}>
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.swipper-next-button',
                        prevEl: '.swipper-prev-button',
                    }}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        600: { slidesPerView: 2 },
                    }}
                >
                    {posts.map((post, index) => (
                        <SwiperSlide key={index}>
                            <BlogPost {...mapServerPost(post)} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
};