import { useContext } from 'react';
import { ModalContext } from '../../../../app/providers/ModalProvider/ModalProvider';

import blop from '../../../../shared/assets/icons/shapes/blop.svg';
import { HomeHeaderParallax } from './HomeHeaderParallax';
import { Button } from '../../../../shared/ui/Button/Button';


export const HomeHeader = () => {
    const { openModal } = useContext(ModalContext);


    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="header__text">
                        <h1>ШКОЛА ПРОГРАМУВАННЯ <span>МІЙ&nbsp;КОМПЬЮТЕР</span> ДЛЯ ДІТЕЙ ТА ДОРОСЛИХ У ДНІПРІ</h1>
                        <p>Вивчайте курси з програмування, веб дизайну, 3Д моделювання, маркетингу, SEO, SMM, з нуля, займаючись зі своїм викладачем онлайн або в мережі наших офісів.</p>
                        <ul className="header__list">
                            <li className="header__item">Підходить для початківців</li>
                            <li className="header__item">Індивідуальний графік</li>
                            <li className="header__item">Особистий педагог</li>
                        </ul>
                        <Button onClick={() => openModal('order')}>Замовити дзвінок</Button>
                    </div>
                    <HomeHeaderParallax />
                    <img className="header__blop" src={blop} alt="blop" />
                </div>
            </div>
        </header>
    );
};
