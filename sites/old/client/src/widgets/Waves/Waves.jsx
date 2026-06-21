import { useEffect, useState, useRef } from 'react'

import { WavesCanvas, WavesWrapper } from './Waves.styles';

export const Waves = () => {
    let canvas = useRef()
    let [cnvWidth, setCnvWidth] = useState(document.documentElement.offsetWidth);

    let cnvHeight = 200
    let waveHeight = cnvHeight;
    let speed = 1;
    let offset = 15;
    let waves = [];
    let waves2 = [];

    window.addEventListener('resize', function () {
        setCnvWidth(document.documentElement.offsetWidth);
    })

    useEffect(() => {
        let ctx = canvas.current.getContext('2d')
        let requestId;

        // animation

        for (let i = 0; i < 55; i++) {
            let wave = {
                height: cnvHeight - 5 * Math.random() * 7,
                move: speed * Math.random(),
            }
            waves.push(wave)
        }
        for (let i = 0; i < 55; i++) {
            let wave = {
                height: cnvHeight - 5 * Math.random() * 5,
                move: speed * Math.random(),
            }
            waves2.push(wave)
        }

        function draw() {
            ctx.fillStyle = 'yellow';
            for (let i = 0; i < waves.length; i++) {
                ctx.beginPath();
                ctx.moveTo(i * 50, cnvHeight);
                ctx.lineTo(i * 50, waves[i].height);
                ctx.arc(i * 50 + 25, waves[i].height, 25, Math.PI, 0, false);
                ctx.lineTo(i * 50 + 50, cnvHeight);
                ctx.fill();
            }
            ctx.fillStyle = '#242538';
            for (let i = 0; i < waves2.length; i++) {
                ctx.beginPath();
                ctx.moveTo(i * 50 - 25, cnvHeight);
                ctx.lineTo(i * 50 - 25, waves2[i].height);
                ctx.arc(i * 50, waves2[i].height, 25, Math.PI, 0, false);
                ctx.lineTo(i * 50 + 25, cnvHeight);
                ctx.fill();
            }
        }

        function clear() {
            ctx.clearRect(0, 0, cnvWidth, cnvHeight)
        }

        function render() {
            for (let i = 0; i < waves.length; i++) {
                waves[i].height -= waves[i].move
                if (waves[i].height <= cnvHeight * 0.2) {
                    waves[i].move = -speed * Math.random()
                } else if (waves[i].height >= cnvHeight * 0.9) {
                    waves[i].move = speed * Math.random()
                }
            }
            for (let i = 0; i < waves2.length; i++) {
                waves2[i].height -= waves2[i].move
                if (waves2[i].height <= cnvHeight * 0.5) {
                    waves2[i].move = -speed * Math.random()
                } else if (waves2[i].height >= cnvHeight) {
                    waves2[i].move = speed * Math.random()
                }
            }
        }

        function animation() {
            requestId = requestAnimationFrame(animation);
            clear();
            draw();
            render();
        }
        // animation

        animation()

        return () => {
            cancelAnimationFrame(requestId);
        };
    })

    return (
        <WavesWrapper>
            <WavesCanvas ref={canvas} width={cnvWidth} height={cnvHeight} />
        </WavesWrapper>
    )

}