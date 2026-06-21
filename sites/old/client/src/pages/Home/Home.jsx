import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'

import { DataContext } from "../../app/providers/DataProvider/DataProvider";

import { Waves } from '../../widgets/Waves'
import FAQ from '../../widgets/FAQ/FAQ'
import How from '../../widgets/How/How'
import About from '../../widgets/About/About'
import Contacts from '../../widgets/Contacts/Contacts'
import { Abilities } from './components/Abilities'
import For from './components/for/For'
import { Sertificate } from '../../widgets/Sertificate'
import { Banner } from '../../widgets/Banner'
import Plan from '../../widgets/Plan/Plan'
import { HomeHeader } from './components/HomeHeader';
import { Course } from './components/Course'
import { BlogSlider } from '../../widgets/BlogSlider'
import { Container } from '@mui/material';

export const Home = () => {

    const { courses, demo, posts } = useContext(DataContext);

    return (
        <div>
            <Helmet>
                <title>Академія Мій Комп'ютер Дніпро | Курси програмування</title>
                <meta name="description" content="Академія Мій Комп'ютер Дніпро — курси програмування, веб-дизайну та IT для дітей і дорослих. Понад 27 років досвіду. Онлайн та офлайн. Записуйтесь!" />
                <link rel="canonical" href="https://mycomputer.education/" />
                <meta property="og:url" content="https://mycomputer.education/" />
                <meta property="og:title" content="Академія Мій Комп'ютер Дніпро | Курси програмування" />
                <meta property="og:description" content="Курси програмування, веб-дизайну та IT для дітей і дорослих. Понад 27 років досвіду. Онлайн та офлайн." />
            </Helmet>
            <HomeHeader />
            <Course courses={courses} />
            <Banner />
            <Plan plans={demo ? demo.map(course => Object.assign(course.levels[0], { tag: course.tag, name: course.name })) : null} />
            <For />
            <How />
            <Sertificate />
            <Abilities />
            <FAQ />
            <About />
            {posts?.length ?
            <Container sx={{marginBottom:2}}>
                <BlogSlider posts={posts} title={'Статті'} />
            </Container>
                :''}
            <Waves />
            <Contacts />
        </div>
    )
}
