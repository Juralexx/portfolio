import React from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import Logo from './tools/Logo';

const SmallLoader = ({ finishLoading }) => {
    const animate = React.useCallback(() => {
        const mainTimeline = anime.timeline({ complete: () => finishLoading() })

        mainTimeline
            .add({
                targets  : '.loader-logo',
                delay    : 0,
                duration : 100,
                easing   : 'easeInOutQuart',
                scale    : 0,
            })
            .add({
                targets  : '.loader-logo',
                delay    : 400,
                duration : 700,
                easing   : 'easeInOutQuart',
                scale    : 1,
            })
            .add({
                targets  : '.loader',
                duration : 200,
                easing   : 'easeInOutQuart',
                opacity  : 0,
                zIndex   : -1,
            })
    }, [finishLoading])

    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10)
        animate()
        return () => clearTimeout(timeout)
    }, [animate])

    return (
        <StyledLoader className="loader" isMounted={isMounted}>
            <div className="logo-wrapper">
                <Logo />
                <ProgressBar>
                    <div className='progress-bar'>
                        <div className="progress-value"></div>
                    </div>
                </ProgressBar>
            </div>
        </StyledLoader>
    )
}

SmallLoader.propTypes = {
    finishLoading: PropTypes.func.isRequired,
}

export default React.memo(SmallLoader)

const StyledLoader = styled.div`
    position         : fixed;
    top              : 0;
    bottom           : 0;
    left             : 0;
    right            : 0;
    width            : 100vw;
    height           : 100vh;
    background-color : var(--body);
    z-index          : 99;
    .logo-wrapper {
        position   : absolute;
        left       : 50%;
        top        : 50%;
        transform  : translate(-50%, -50%);
        width      : max-content;
        max-width  : 250px;
        transition : var(--transition);
        opacity    : ${props => (props.isMounted ? 1 : 0)};
        
        .logo {
            display  : block;
            width    : 150px;
            height   : 150px;
            margin   : 0 auto;
            fill     : var(--primary);
            overflow : visible;

            @media(max-width: 576px) {
                width  : 100px;
                height : 100px;
            }
        }
    }
`;

const ProgressBar = styled.div`
    position   : relative;
    margin-top : 30px;

    .progress-bar { 
        position      : relative;
        height        : 4px;
        width         : 250px;
        background    : var(--content-light);
        border-radius : var(--rounded-full);

        @media(max-width: 576px) {
            width : 200px;
        }

        .progress-value {
            height                    : 100%;
            width                     : 100%;
            background                : var(--primary);
            border-radius             : var(--rounded-full);
            transition                : .2s;
            animation                 : fillbar 1s;
            animation-iteration-count : 1;
        }
    }

    @keyframes fillbar {
        0% {
            width : 0;
        }
        100% {
            width : 100%;
        }
    }
`