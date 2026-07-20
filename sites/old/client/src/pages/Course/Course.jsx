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
                <title>{course?.name ? `${course.name} — курс онлайн | Академія Мій Комп'ютер` : "Академія Мій Комп'ютер | Курси програмування та дизайну"}</title>
                <meta name="description" content={course?.name ? `Курс ${course.name} в Академії Мій Комп'ютер. ${course.description ? course.description.slice(0, 110) + '.' : 'Навчання для дітей і дорослих онлайн та офлайн. Досвідчені викладачі, малі групи, сертифікат.'}` : "Курси програмування для дітей і дорослих по всій Україні."} />
                <meta name="keywords" content={course?.name ? `${course.name}, курс ${course.name} онлайн, навчання ${course.name}, Академія Мій Комп'ютер, курси програмування онлайн, IT курси для дітей` : "курси програмування онлайн, IT курси для дітей, Академія Мій Комп'ютер"} />
                <link rel="canonical" href={`https://old.mycomputer.education/course/${params.id}/`} />
                <meta property="og:url" content={`https://old.mycomputer.education/course/${params.id}/`} />
                <meta property="og:title" content={course?.name ? `${course.name} — курс онлайн | Академія Мій Комп'ютер` : "Академія Мій Комп'ютер"} />
                <meta property="og:description" content={course?.name ? `Курс ${course.name} в Академії Мій Комп'ютер. Навчання онлайн по всій Україні, малі групи, сертифікат.` : ''} />
                <meta property="og:image" content="https://old.mycomputer.education/og-image.png" />
                {course && <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Course',
                    name: course.name,
                    description: course.description || `Курс ${course.name} для дітей і дорослих`,
                    url: `https://old.mycomputer.education/course/${params.id}/`,
                    provider: {
                        '@type': 'Organization',
                        name: "Академія Мій Комп'ютер",
                        url: 'https://old.mycomputer.education',
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
