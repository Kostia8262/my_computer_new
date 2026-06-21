import React from 'react'

import './style.css'

import ModalEnroll from '../../modals/ModalEnroll'

import penSm from '../../shared/assets/icons/interface/pen_sm.svg'
import sertificate1 from '../../shared/assets/images/sertificate1.png'
import sertificate2 from '../../shared/assets/images/sertificate2.png'
import hat from '../../shared/assets/images/hat.png'


export const Sertificate = () => {
    return (
        <section className="sertificate">
            <div className="container">
                <div className="sertificate__wrapper">
                    <div className="sertificate__img">
                        <div className="section__heading">
                            <div className="heading__icon">
                                <img src={penSm} alt="" />
                            </div>
                            <h2>Сертифікат Мій Комп'ютер</h2>
                        </div>
                        <p className="sertificate__description">Підтвердить, що ви пройшли курс, а також стане додатковим аргументом при влаштуванні на роботу</p>
                        <div className="sertificate__items">
                            <div className="sertificate__item">
                                <img src={sertificate1} alt="Сертифікат Мій Комп'ютер — зразок 1" />
                            </div>
                            <div className="sertificate__item">
                                <img src={sertificate2} alt="Сертифікат Мій Комп'ютер — зразок 2" />
                            </div>
                        </div>
                        <div className="sertificate__item_mob">
                            <img src={hat} alt="" loading="lazy" />
                        </div>
                    </div>
                    <div className="sertificate__form">
                        <ModalEnroll />
                    </div>
                </div>
            </div>
        </section>
    )
}