import React from 'react'

import './style.css'

import lampSm from '../../../../shared/assets/icons/interface/lamp_sm.svg'
import freelancer from '../../../../shared/assets/images/freelance.svg'
import studia from '../../../../shared/assets/images/studia.svg'
import brand from '../../../../shared/assets/images/brand.svg'
import { AbilitiesCard } from './AbilitiesCard'

const abilities = [
    {
        title: 'Студія',
        description: 'Стабільна висока зарплата, гнучкий графік і веселий колектив. Трохи печива та кави.',
        image: studia,
        rating: {
            time: 3,
            cash: 2
        }
    },
    {
        title: 'Свій бренд',
        description: 'Без навичок і капіталу сюди не потрапити, але потенційна винагорода вартує затрачених зусиль.',
        image: brand,
        rating: {
            time: 4,
            cash: 3
        }
    },
    {
        title: 'Фріланс',
        description: 'Простий, для новачків, шлях, який, однак, вимагає багато часу на розвиток свого профілю.',
        image: freelancer,
        rating: {
            time: 2,
            cash: 1
        }
    }
]

export const Abilities = () => {
    return (
        <section className="abilities">
            <div className="container">
                <div className="section__heading">
                    <div className="heading__icon">
                        <img src={lampSm} alt="" />
                    </div>
                    <h2>Як застосувати навички</h2>
                </div>
                <div className="abilities__cards">
                    {abilities.map((ability, id) => (
                        <AbilitiesCard key={id} {...ability} />
                    ))}
                </div>
            </div>
        </section>
    )
}