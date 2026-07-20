import React from 'react'

import './style.css'
import { BannerContent, BannerIcon, BannerText, BannerWrapper } from './Banner.styles'
import { Container } from '@mui/material'

export const Banner = () => {
    return (
        <BannerWrapper>
            <Container>
                <BannerContent>
                    <BannerIcon>!</BannerIcon>
                    <BannerText>Ми уважно стежимо за актуальністю курсу і технологій, щоб ваші навички максимально відповідали реальній роботі в IT сфері.</BannerText>
                </BannerContent>
            </Container>
        </BannerWrapper>
    )
}