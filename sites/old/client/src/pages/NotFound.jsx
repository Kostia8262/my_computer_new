import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import num4 from '../shared/assets/images/4.svg'
import num0 from '../shared/assets/images/0.svg'


export const NotFound = () => {
    return (
        <section className='not_found'>
            <Helmet>
                <title>404 — Сторінка не знайдена | Академія Мій Комп'ютер</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="container">
                <div className="not_found__banner" aria-label="404">
                    <img src={num4} alt="" />
                    <img src={num0} alt="" />
                    <img src={num4} alt="" />
                </div>
                <p>Такої сторінки не існує</p>
            </div>
            <Link className='not_found__link' to="/">На головну</Link>
        </section>
    )
}
