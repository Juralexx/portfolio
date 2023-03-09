import { createGlobalStyle } from 'styled-components';
import { Normalize } from './Normalize';
import { TransitionStyles } from './TransitionStyles';
import variables from './variables';

/**
 * Styles globaux
 */

const GlobalStyles = createGlobalStyle`
    ${variables}
    ${TransitionStyles}
    ${Normalize}

    * {
        margin          : 0;
        padding         : 0;
        box-sizing      : border-box;
        text-decoration : none;
        z-index         : 1;
    }

    html {
        min-height      : 100vh;
        width           : 100%;
        margin          : 0;
        padding         : 0;
        scroll-behavior : smooth;
        scrollbar-width : thin;
        scrollbar-color : var(--body);
        box-sizing      : border-box;
    }

    body {
        min-width         : 100vw;
        height            : 100%;
        margin            : 0;
        padding           : 0;
        font-family       : var(--font-fam1);
        color             : var(--text);
        font-size         : 14px;
        background-color  : var(--body);
        background-repeat : repeat;
        overflow-y        : auto;
        overflow-x        : hidden;

        &.no-scroll {
            overflow-y : hidden;
        }
        &.blur {
            overflow: hidden;
            main {
                > * {
                    filter         : blur(5px) brightness(0.7);
                    transition     : var(--transition);
                    pointer-events : none;
                    user-select    : none;
                }
            }
        }
        &.dark,
        &.purple,
        &.orange,
        &.green,
        &.navy,
        &.yellow,
        &.pink,
        &.red {
            &.highlighted {
                &:before {
                    content          : '';
                    position         : fixed;
                    height           : 200px;
                    width            : 200px;
                    background-color : rgba(var(--primary-rgb), 1);
                    filter           : blur(160px);
                }

                &:after {
                    content          : '';
                    position         : fixed;
                    top              : 200px;
                    left             : 250px;
                    height           : 200px;
                    width            : 200px;
                    background-color : var(--primary-dark);
                    filter           : blur(140px);
                }
            }
        }
    }

    ::selection {
        background-color : rgba(var(--primary-rgb), 0.2);
        color            : var(--primary);
    }

    :focus {
        outline        : 2px dashed var(--primary);
        outline-offset : 3px;
    }

    :focus-visible {
        outline        : 2px dashed var(--primary);
        outline-offset : 3px;
    }

    :focus:not(:focus-visible) {
        outline        : none;
        outline-offset : 0px;
    }

    ::-webkit-scrollbar {
        width : 12px;
    }
    ::-webkit-scrollbar-track {
        background : var(--body);
    }
    ::-webkit-scrollbar-thumb {
        background-color : var(--light-border);
        border           : 3px solid var(--body);
        border-radius    : 10px;
    }

    a {
        background-color : transparent;
        color            : var(--text);
    }

    p {
        font-size    : 16px;
        font-weight  : 400;
        line-height  : 24px;
        font-stretch : 100%;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        margin      : 0 0 10px 0;
        font-weight : 600;
        color       : var(--title);
    }

    h1 {
        font-size   : 32px;
        line-height : 36px;
    }
    h2 {
        font-size   : 28px;
        line-height : 32px;
    }
    h3 {
        font-size   : 20px;
        line-height : 24px;
    }
    h4 {
        font-size   : 18px;
        line-height : 22px;
    }
    h5 {
        font-size   : 16px;
        line-height : 20px;
    }

    @media(max-width:768px) {
        h1 {
            font-size   : 28px;
            line-height : 32px;
        }
        h2 {
            font-size   : 24px;
            line-height : 28px;
        }
        h3 {
            font-size   : 20px;
            line-height : 24px;
        }
        h4 {
            font-size   : 18px;
            line-height : 22px;
        }
        h5 {
            font-size   : 16px;
            line-height : 20px;
        }
    }

    .up__title {
        color        : var(--text-secondary);
        font-size    : 22px;
        font-weight  : 600;
        font-stretch : 125%;
        font-family  : var(--font-fam2);
        display      : inline-block;
    }

    .section__title {
        position     : relative;
        margin       : 16px 0;
        width        : 100%;
        text-align   : left;
        font-family  : var(--font-fam1);
        color        : var(--primary);
        font-weight  : 700;
        font-stretch : 115%;
        font-size    : clamp(28px, 4.5vw, 48px);
        line-height  : 1.1;
        white-space  : nowrap;
    }

    .custom-link {
        position      : relative;
        font-family   : var(--font-fam2);
        color         : var(--primary);
        font-size     : 16px;
        margin-bottom : 30px;

        &:after {
            content       : '';
            position      : absolute;
            left          : 0;
            bottom        : -1px;
            width         : 0;
            height        : 1px;
            background    : rgba(var(--primary-rgb), 0.7);
            border-radius : var(--rounded-full);
            transition    : var(--transition);
        }
        &:hover {
            &:after {
                width : 100%;
            }
        }
    }

    .mouse-ripple {
        position         : fixed;
        width            : 10px;
        height           : 10px;
        background-color : rgba(var(--primary-rgb), 0.2);
        border-radius    : 50%;
        border           : 1px solid rgba(var(--primary-rgb), 0.4);

        &:before {
            content          : '';
            position         : absolute;
            width            : 3px;
            height           : 3px;
            left             : 50%;
            top              : 50%;
            transform        : translate(-50%, -50%);
            background-color : rgba(var(--primary-rgb), 0.2);
            border-radius    : 50%;
            animation        : ripple-effect .35s linear 1s;
        }
    }

    @keyframes ripple-effect {
        to {
            transform : scale(20);
            opacity   : 0;
        }
    }

    .rubberband {
        display                   : inline-block;
        animation-duration        : 1s;
        animation-fill-mode       : both;
        animation-iteration-count : 1;
        font-weight               : bold;
        white-space               : pre;

        &:hover {
            animation-name : rubberBand;
        }

        &.animated {
            animation-name : rubberBand;
        }
    }

    @keyframes rubberBand {
        from {
            transform: scale3d(1, 1, 1);
        }
        30% {
            transform: scale3d(1.25, 0.75, 1);
        }
        40% {
            transform: scale3d(0.75, 1.25, 1);
        }
        50% {
            transform: scale3d(1.15, 0.85, 1);
        }
        65% {
            transform: scale3d(0.95, 1.05, 1);
        }
        75% {
            transform: scale3d(1.05, 0.95, 1);
        }
        to {
            transform: scale3d(1, 1, 1);
        }
    }
`;

export default GlobalStyles;