import React from 'react'

import './style.css'

import screenSm from '../../shared/assets/icons/interface/screen_sm.svg'
import about from '../../shared/assets/images/about.png'


const About = () => {
    return (
        <section className="about">
            <div className="container">
                <div className="about__wrapper">
                    <div className="about__img">
                        <img src={about} alt="Студенти Академії Мій Комп'ютер за навчанням" loading="lazy" />
                    </div>
                    <div className="about__text">
                        <div className="section__heading">
                            <div className="heading__icon">
                                <img src={screenSm} alt="" />
                            </div>
                            <h2>Про академію Мій Комп'ютер</h2>
                        </div>
                        <blockquote>Працювати треба не 12 годин, а головою. — Стів Джобс</blockquote>
                        <p>Запрошуємо на комп'ютерні курси дітей та дорослих. Ми маємо великий перелік напрямків та розгалужену мережу відділень.</p>
                        <p>Можемо запропонувати навчання за напрямками:</p>
                        <ul>
                            <li>Веб-дизайн</li>
                            <li>Растрова графіка, векторна графіка та анімація</li>
                            <li>Програмування для дітей</li>
                            <li>UI/UX дизайн</li>
                            <li>Python</li>
                            <li>Frontend</li>
                            <li>Backend</li>
                            <li>JavaScript</li>
                            <li>3ds Max + Corona + AutoCAD</li>
                            <li>SEO + SMM</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
