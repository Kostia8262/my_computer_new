import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide, useSwiper, } from 'swiper/react';
import { Autoplay, } from "swiper";

import 'swiper/css';

import CourseCard from './CourseCard'
import CourseCardSkeleton from './CourseCardSkeleton';

// import next from '../../img/next.svg'
// import prev from '../../img/prev.svg'

const CourseCards = ({ courses }) => {
    // let [courses, setCourses] = useState(data)
    let [tag, setTag] = useState('')
    let filtredCourses = courses ? courses.filter((course) => course.tag.includes(tag)) : []
    // let filtredCourses = []


    return (
        <div className="ways__wrapper">
            <Swiper
                slidesPerView={5}
                // centeredSlides={true}
                autoplay={{
                    delay: 3000,
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1.3,
                    },
                    375: {
                        slidesPerView: 1.5,
                    },
                    400: {
                        slidesPerView: 1.7,
                        centeredSlides: false,
                    },
                    639: {
                        slidesPerView: 3,
                    },
                    865: {
                        slidesPerView: 4
                    },
                    1000: {
                        slidesPerView: 5
                    }
                }}
                modules={[Autoplay,]}
            >
                <div slot="container-start" className="ways__buttons">
                    <div className="ways__categories">
                        <button className={tag == '' ? 'active' : ''} onClick={() => { setTag('') }}>Всі</button>
                        <button className={tag == 'design' ? 'active' : ''} onClick={() => { setTag('design') }}>Дизайн та 3д</button>
                        <button className={tag == 'dev' ? 'active' : ''} onClick={() => { setTag('dev') }}>Програмування</button>
                        <button className={tag == 'child' ? 'active' : ''} onClick={() => { setTag('child') }}>Курси для дітей</button>
                        <button className={tag == 'office' ? 'active' : ''} onClick={() => { setTag('office') }}>Офісні та SEO SMM</button>
                    </div>
                    <div className="ways__nav">
                        {/* <button onClick={useSwiper().slideNext()}><img src={prev} alt="" /></button>
                    <button onClick={useSwiper().slideNext()}><img src={next} alt="" /></button> */}
                    </div>
                </div>
                <div className="ways__slides--">

                    {filtredCourses.length ? filtredCourses.map((course) =>
                        <SwiperSlide key={course.id}>
                            <div className="ways__slide">
                                <CourseCard {...course} />
                            </div>
                        </SwiperSlide>
                    ) : [0, 0, 0, 0, 0, 0].map((elem, id) =>
                        <SwiperSlide key={id}>
                            <div className="ways__slide">
                                <CourseCardSkeleton />
                            </div>
                        </SwiperSlide>)
                    }

                </div>
            </Swiper>
        </div>
    )
}

export default CourseCards