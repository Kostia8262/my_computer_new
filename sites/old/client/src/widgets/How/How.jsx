import React from 'react'

import './style.css'

import penSm from '../../shared/assets/icons/interface/pen_sm.svg'

import phone from '../../shared/assets/icons/interface/phone.svg'
import screen from '../../shared/assets/icons/interface/screen.svg'
import book from '../../shared/assets/icons/interface/book.svg'
import palett from '../../shared/assets/icons/interface/palett.svg'
import hat from '../../shared/assets/icons/interface/hat.svg'
import scroll from '../../shared/assets/icons/interface/scroll.svg'

import howto_boy from '../../shared/assets/images/howto_boy.svg'
import howto_girl from '../../shared/assets/images/howto_girl.svg'
import howto_boy_pop from '../../shared/assets/images/how_to_boy.png'
import planet_s from '../../shared/assets/images/planet_s.svg'
import planet_b from '../../shared/assets/images/planet_b.svg'

const How = () => {
    return (
        <section className="how">
            <div className="container">
                <div className="section__heading">
                    <div className="heading__icon">
                        <img src={penSm} alt="" />
                    </div>
                    <h2>Як записатись на курси</h2>
                </div>
                <div className="how__cards">
                    <div className="how__card">
                        <img className='how__card_icon' src={phone} alt="" />
                        <p>Обираємо напрямок</p>
                        <img className='how__card_pop' src={howto_boy_pop} alt="" loading="lazy" />
                    </div>
                    <div className="how__card">
                        <img className='how__card_icon' src={screen} alt="" />
                        <p>Онлайн або стаціонар</p>
                        <img className='how__card_pop' src={howto_boy_pop} alt="" loading="lazy" />
                    </div>
                    <div className="how__card">
                        <img className='how__card_icon' src={book} alt="" />
                        <p>Навчаємося і практикуємося</p>
                        <img className='how__card_pop' src={howto_boy_pop} alt="" loading="lazy" />
                    </div>
                    <div className="how__card">
                        <img className='how__card_icon' src={palett} alt="" />
                        <p>Оформлюємо портфоліо</p>
                        <img className='how__card_pop' src={howto_boy_pop} alt="" loading="lazy" />
                    </div>
                    <div className="how__card">
                        <img className='how__card_icon' src={scroll} alt="" />
                        <p>Отримуємо сертифікат</p>
                        <img className='how__card_pop' src={howto_boy_pop} alt="" loading="lazy" />
                    </div>
                    <div className="how__card">
                        <img className='how__card_icon' src={hat} alt="" />
                        <p>Шукаємо вакансії серед партнерів</p>
                        <img className='how__card_pop' src={howto_boy_pop} alt="" loading="lazy" />
                    </div>
                    <div className="how__card_mob">
                        <span>1</span>
                        <div className="how__card_description">
                            <h3>Вибір напрямку</h3>
                            <p>Вибираємо форму навчання, знайомимося з викладачем і встановлюємо всі необхідні програми</p>
                        </div>
                    </div>
                    <div className="how__card_mob">
                        <span>2</span>
                        <div className="how__card_description">
                            <h3>Старанно вчимося і практикуємося</h3>
                            <p>Проходимо всі практики та теорію, оформлюємо портфоліо робіт</p>
                        </div>
                    </div>
                    <div className="how__card_mob">
                        <span>3</span>
                        <div className="how__card_description">
                            <h3>Пошук роботи</h3>
                            <p>Формуємо резюме, готуємо портфоліо до перевірок, використовуємо всі доступні платформи та пропозиції від наших партнерів</p>
                        </div>
                    </div>
                </div>
            </div>
            <img src={planet_s} alt="" className="planet_s" loading="lazy" />
            <img src={planet_b} alt="" className="planet_b" loading="lazy" />
            <img src={howto_boy} alt="" className="how__boy" loading="lazy" />
            <img src={howto_girl} alt="" className="how__girl" loading="lazy" />
        </section>
    )
}

export default How