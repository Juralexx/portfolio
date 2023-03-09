import { useEffect } from 'react';
import anime from 'animejs';
import ScrollReveal from 'scrollreveal';

/**
 * Reveal animation
 */

const isSSR = typeof window === 'undefined';
export const scrollreveal = isSSR ? null : ScrollReveal();

export const scrollrevealConfig = (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
})

export const useReveal = (element, delay) => {
    useEffect(() => {
        scrollreveal.reveal(element, scrollrevealConfig(delay))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export const useMultipleReveal = (array, inBetweenDelay = 100) => {
    useEffect(() => {
        array.map((el, i) => scrollreveal.reveal(el, scrollrevealConfig((i + 1) * inBetweenDelay)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

/**
 * Writting animation
 */

export const writingAnimation = (ref, mainClass, delay, lettersDelay = 40) => {
    ref.innerHTML = ref.textContent.replace(/([^x00-\x80]|\w)/g, "<span class='sentence'>$&</span>");

    anime.timeline()
        .add({
            targets: `${mainClass} .sentence`,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1100,
            offset: '-=775',
            delay: (_, i) => delay + lettersDelay * (i + 1),
        })
}

// React.useEffect(() => {
//     writingAnimation(titleRef.current, '.__title', isHome ? 2100 : 2000)
//     writingAnimation(titleRef.current, '.__subtitle', isHome ? 2200 : 2000)
// }, [isHome])