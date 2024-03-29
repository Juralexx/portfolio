import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Glitched = ({ text, HTMLElement, useRef }) => {
    return (
        <Title>
            <HTMLElement className="__glitched __title" data-text={text} ref={useRef}>
                {text}
            </HTMLElement>
            <div className="__glow">
                {text}
            </div>
            <div className="__scanlines"></div>
        </Title>
    )
}

export default React.memo(Glitched)

Glitched.propTypes = {
    HTMLElement: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

const Title = styled.div`
    .__glitched {
        position   : relative;
        animation  : glitch 5s 5s infinite;

        &::before {
            content     : attr(data-text);
            position    : absolute;
            left        : -2px;
            text-shadow : -4px 0 var(--primary);
            background  : transparent;
            overflow    : hidden;
            top         : 0;
            animation   : noise-1 3s linear infinite alternate-reverse, glitch 5s 5.05s infinite;
        }
        &::after {
            content     : attr(data-text);
            position    : absolute;
            left        : 2px;
            text-shadow : -4px 0 var(--primary);
            background  : transparent;
            overflow    : hidden;
            top         : 0;
            animation   : noise-2 3s linear infinite alternate-reverse, glitch 5s 5s infinite;
        }
    }

    @keyframes glitch {
        1%{
            transform: rotateX(10deg) skewX(90deg);
        }
        2%{
            transform: rotateX(0deg) skewX(0deg);
        }
    }

    @keyframes noise-1 {
        /* 3.3333333333% {
            clip-path: inset(7px 0 44px 0);
        }
        6.6666666667% {
            clip-path: inset(87px 0 10px 0);
        } */
        10% {
            clip-path: inset(25px 0 20px 0);
        }
        /* 13.3333333333% {
            clip-path: inset(71px 0 8px 0);
        }
        16.6666666667% {
            clip-path: inset(9px 0 3px 0);
        } */
        20% {
            clip-path: inset(95px 0 1px 0);
        }
        /* 23.3333333333% {
            clip-path: inset(52px 0 4px 0);
        }
        26.6666666667% {
            clip-path: inset(57px 0 15px 0);
        } */
        30% {
            clip-path: inset(17px 0 63px 0);
        }
        33.3333333333% {
            clip-path: inset(35px 0 6px 0);
        }
        36.6666666667% {
            clip-path: inset(99px 0 2px 0);
        }
        40% {
            clip-path: inset(27px 0 49px 0);
        }
        /* 43.3333333333% {
            clip-path: inset(14px 0 9px 0);
        }
        46.6666666667% {
            clip-path: inset(50px 0 43px 0);
        } */
        50% {
            clip-path: inset(35px 0 56px 0);
        }
        /* 53.3333333333% {
            clip-path: inset(1px 0 42px 0);
        }
        56.6666666667% {
            clip-path: inset(10px 0 30px 0);
        } */
        60% {
            clip-path: inset(20px 0 79px 0);
        }
        /* 63.3333333333% {
            clip-path: inset(56px 0 45px 0);
        }
        66.6666666667% {
            clip-path: inset(12px 0 59px 0);
        } */
        70% {
            clip-path: inset(7px 0 71px 0);
        }
        /* 73.3333333333% {
            clip-path: inset(4px 0 30px 0);
        }
        76.6666666667% {
            clip-path: inset(63px 0 26px 0);
        } */
        80% {
            clip-path: inset(92px 0 1px 0);
        }
        /* 83.3333333333% {
            clip-path: inset(54px 0 15px 0);
        }
        86.6666666667% {
            clip-path: inset(82px 0 13px 0);
        } */
        90% {
            clip-path: inset(67px 0 3px 0);
        }
        /* 93.3333333333% {
            clip-path: inset(28px 0 17px 0);
        }
        96.6666666667% {
            clip-path: inset(19px 0 42px 0);
        } */
        100% {
            clip-path: inset(2px 0 20px 0);
        }
    }
 
    @keyframes noise-2 {
	    0% {
            clip-path: inset(93px 0 6px 0);
        }
        3.3333333333% {
            clip-path: inset(16px 0 73px 0);
        }
        6.6666666667% {
            clip-path: inset(15px 0 81px 0);
        }
        10% {
            clip-path: inset(66px 0 6px 0);
        }
        13.3333333333% {
            clip-path: inset(76px 0 15px 0);
        }
        16.6666666667% {
            clip-path: inset(23px 0 10px 0);
        }
        20% {
            clip-path: inset(59px 0 13px 0);
        }
        23.3333333333% {
            clip-path: inset(87px 0 1px 0);
        }
        26.6666666667% {
            clip-path: inset(13px 0 71px 0);
        }
        30% {
            clip-path: inset(8px 0 3px 0);
        }
        33.3333333333% {
            clip-path: inset(6px 0 71px 0);
        }
        36.6666666667% {
            clip-path: inset(31px 0 4px 0);
        }
        40% {
            clip-path: inset(77px 0 7px 0);
        }
        43.3333333333% {
            clip-path: inset(19px 0 25px 0);
        }
        46.6666666667% {
            clip-path: inset(34px 0 28px 0);
        }
        50% {
            clip-path: inset(48px 0 11px 0);
        }
        53.3333333333% {
            clip-path: inset(47px 0 35px 0);
        }
        56.6666666667% {
            clip-path: inset(96px 0 3px 0);
        }
        60% {
            clip-path: inset(16px 0 17px 0);
        }
        63.3333333333% {
            clip-path: inset(21px 0 36px 0);
        }
        66.6666666667% {
            clip-path: inset(2px 0 9px 0);
        }
        70% {
            clip-path: inset(60px 0 3px 0);
        }
        73.3333333333% {
            clip-path: inset(75px 0 12px 0);
        }
        76.6666666667% {
            clip-path: inset(67px 0 31px 0);
        }
        80% {
            clip-path: inset(15px 0 81px 0);
        }
        83.3333333333% {
            clip-path: inset(42px 0 10px 0);
        }
        86.6666666667% {
            clip-path: inset(71px 0 16px 0);
        }
        90% {
            clip-path: inset(57px 0 19px 0);
        }
        93.3333333333% {
            clip-path: inset(13px 0 36px 0);
        }
        96.6666666667% {
            clip-path: inset(40px 0 13px 0);
        }
        100% {
            clip-path: inset(5px 0 64px 0);
        }
    }

    .__scanlines {
        overflow       : hidden;
        mix-blend-mode : difference;

        &::before {
            content   : "";
            position  : absolute;
            width     : 100%;
            height    : 100%;
            top       : 0;
            left      : 0;
            animation : fudge 7s ease-in-out alternate infinite;
        }
    }

    @keyframes fudge {
        from {
            transform: translate(0px, 0px);
        }
        to {
            transform: translate(0px, 2%);
        }
    }

    .__glow {
        @extend .glitch;
        text-shadow : 0 0 1000px rgb(223, 191, 191);
        color       : transparent;
        position    : absolute;
        top         : 0;
    }

    .subtitle {
        font-family    : Arial, Helvetica, sans-serif;
        font-weight    : 100;
        font-size      : .8vw;
        color          : rgba(165, 141, 141, .4);
        text-transform : uppercase;
        letter-spacing : 1em;
        text-align     : center;
        position       : absolute;
        left           : 17%;
        animation      : glitch-2 5s 5.02s infinite;
    }

    @keyframes glitch-2 {
        1%{
            transform : rotateX(10deg) skewX(70deg);
        }
        2%{
            transform : rotateX(0deg) skewX(0deg);
        }
    }
`