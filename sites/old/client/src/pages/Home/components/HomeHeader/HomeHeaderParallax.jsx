import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

import girl from '../../../../shared/assets/images/girl.svg'
import blop2 from '../../../../shared/assets/icons/shapes/blop_2.svg';
import cross from '../../../../shared/assets/icons/interface/cross.svg';
import circle from '../../../../shared/assets/icons/shapes/circle.svg';
import circleBig from '../../../../shared/assets/icons/shapes/circle_big.svg';
import circleBlop from '../../../../shared/assets/icons/shapes/circle_blop.svg';

export const HomeHeaderParallax = () => {
    const headerRef = useRef(null);

    useEffect(() => {
        const elements = headerRef.current.querySelectorAll('img');
        const parallax = (e) => {
            const { clientX: x, clientY: y } = e;
            elements.forEach((el, i) => {
                const rect = el.getBoundingClientRect();
                if (rect.top > window.innerHeight || rect.bottom < 0 || rect.left > window.innerWidth || rect.right < 0) return;
                const depth = ((i + 1) * 10) * 0.0005;
                gsap.to(el, { x: (x - window.innerWidth / 2) * depth, y: (y - window.innerHeight / 2) * depth, duration: 0.3 });
            });
        };
        window.addEventListener('mousemove', parallax);
        return () => window.removeEventListener('mousemove', parallax);
    }, []);
    return (
        <div className="header__img" ref={headerRef}>
            <img className="blop" id='blop2' src={blop2} alt="blop" />
            <img src={girl} alt="girl" />
            <img className="circle" src={circle} alt="circle" />
            <img className="cross" id='cross1' src={cross} alt="cross" />
            <img className="cross" id='cross2' src={cross} alt="cross" />
            <img className="cross" id='cross3' src={cross} alt="cross" />
            <img className="cross" id='cross4' src={cross} alt="cross" />
            <img className="cross" id='cross5' src={cross} alt="cross" />
            <img className="cross" id='cross6' src={cross} alt="cross" />
            <img className="header__circle-blop" src={circleBlop} alt="circle" />
            <img className="header__circle" src={circleBig} alt="circle" />
            <img className="circle-left" src={circle} alt="circle" />
        </div>
    )
}
