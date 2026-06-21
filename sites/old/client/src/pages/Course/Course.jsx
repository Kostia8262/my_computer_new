import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getCourse } from '../../api'

import Plan from '../../widgets/Plan/Plan'
import { Waves } from '../../widgets/Waves'
import FAQ from '../../widgets/FAQ/FAQ'
import About from '../../widgets/About/About'
import Contacts from '../../widgets/Contacts/Contacts'
import { Sertificate } from '../../widgets/Sertificate'
import How from '../../widgets/How/How'
import Program from '../../widgets/Program/Program'
import { CourseHeader } from './components/CourseHeader'
import { DataContext } from '../../app/providers/DataProvider'
import { Container } from '@mui/material'
import { BlogSlider } from '../../widgets/BlogSlider'

export const Course = () => {
    const params = useParams()

    const [data, setData] = useState(null)

    const { posts } = useContext(DataContext)
    const relatedPosts = posts ? posts.filter(post => post.courses.includes(data?.id)) : [];

    useEffect(() => {
        getCourse(params.id)
            .then(data => setData(data))
    }, [params]);
    const course = data?.name ? data : null

    return (
        <div>
            <Helmet>
                <title>Академія Мій Комп'ютер Дніпро | Курс {course?.name ?? ''}</title>
                <meta name="description" content={`${course?.name ?? 'Курс'} — навчання для дітей і дорослих у Академії Мій Комп'ютер, Дніпро. Досвідчені викладачі, онлайн та офлайн.`} />
                <link rel="canonical" href={`https://mycomputer.education/course/${params.id}/`} />
                <meta property="og:url" content={`https://mycomputer.education/course/${params.id}/`} />
                <meta property="og:title" content={`Курс ${course?.name ?? ''} | Академія Мій Комп'ютер Дніпро`} />
                {course && <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Course',
                    name: course.name,
                    description: course.description || `Курс ${course.name} для дітей і дорослих`,
                    url: `https://mycomputer.education/course/${params.id}/`,
                    provider: {
                        '@type': 'Organization',
                        name: "Академія Мій Комп'ютер",
                        url: 'https://mycomputer.education',
                    },
                    ...(course.levels?.length && {
                        offers: course.levels.map(l => ({
                            '@type': 'Offer',
                            price: l.price,
                            priceCurrency: 'UAH',
                            name: l.name,
                        })),
                    }),
                })}</script>}
            </Helmet>
            <CourseHeader course={course} />
            <Plan plans={course ? course.levels.map(level => Object.assign({ tag: course.tag }, level)) : null} />
            <Program themes={course?.themes ?? null} />
            <How />
            <Sertificate />
            <FAQ />
            {posts?.length ?
            <Container sx={{marginBottom:2,padding:0}}>
                <BlogSlider posts={relatedPosts} title={'Статті'} />
            </Container>
                :''}
            <About />
            <Waves />
            <Contacts />
        </div>
    )
}
