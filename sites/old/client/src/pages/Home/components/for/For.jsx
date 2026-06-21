import React from 'react'

import './style.css'

const For = () => {
    return (
        <section className="for">
            <div className="container">
                <div className="for__wrapper">
                    <h2>Для кого наші курси</h2>
                    <ul className="for__list">
                        <li className="for__item"><span>Курси для дітей</span>, щоб отримати сучасну освіту.</li>
                        <li className="for__item"><span>Курси для студентів</span>, які хочуть стати частиною нової індустрії.</li>
                        <li className="for__item"><span>Курси для бізнесменів</span>, які потребують сайті, додатки, просування свого бренду і розробку софту.</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default For