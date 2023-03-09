import React from 'react';
import { navlinks } from '__config';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import anime from 'animejs';
import Logo from 'components/tools/Logo';
import NavbarToggle from './tools/NavbarToggle';
import ThemeToggle from './tools/theme/ThemeToggle';
import Share from './Share';
// import PlayerIcon from './tools/audio/PlayerIcon';
import { OutlinedLinkButton } from './tools/global/Buttons/OutlinedButton';
import useScrollDirection from 'components/tools/hooks/useScrollDirection';
import { useClickOutside } from './tools/hooks/useClickOutside';
import { scrollreveal, scrollrevealConfig, useReveal } from './hooks/useAnimation';
import useMediaQuery from './tools/hooks/useMediaQuery';
import { addBodyClass, addClass, removeBodyClass } from 'Utils';

const Navbar = ({ isHome }) => {
    const md = useMediaQuery('(max-width: 992px)')
    const [open, setOpen] = React.useState(false)
    const tabs = React.useMemo(() => isHome ? navlinks : [{ name: 'Accueil', url: '/' }, ...navlinks], [isHome])

    /**
     * Event listener pour cacher la navbar au scroll
     */

    const scrollDirection = useScrollDirection('down');
    const [scrolledToTop, setScrolledToTop] = React.useState(true)

    const handleScroll = () => setScrolledToTop(window.pageYOffset < 50)

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    /**
     * Animation des onglet au chargement
     */

    React.useEffect(() => {
        if (isHome) {
            anime.timeline()
                .add({
                    targets: '.logo-container',
                    delay: 0,
                    duration: 200,
                    easing: 'easeInOutQuart',
                    opacity: 0,
                    scale: 0
                })
                .add({
                    targets: '.logo-container',
                    delay: 2600,
                    duration: 200,
                    easing: 'easeInOutQuart',
                    opacity: 1,
                    scale: 1
                })

            let delay = 1200
            navlinks.map((_, i) => {
                delay = delay + 100
                return scrollreveal.reveal(`.navlink-${i}`, scrollrevealConfig(delay))
            })
        }
    }, [isHome])

    useReveal('.theme__toggle', 1800)
    useReveal('.__share', 1900)
    useReveal('.__audio', 2000)

    /**
     * 
     */

    const onNavClick = () => {
        if (md) {
            if (open) {
                setOpen(false)
                removeBodyClass('blur')
            } else {
                setOpen(true)
                addBodyClass('blur')
            }
        }
    }
    const navRef = React.useRef()
    useClickOutside(navRef, () => { if (open) onNavClick() })

    /**
     * Ajoute la classe 'active' aux onglets au scroll sur les divs concernées
     */

    const navlinksRef = React.useRef([])

    const divs = React.useMemo(() => {
        let links = []
        navlinks.map(navlink => { return links.push(navlink.url.substring(1)) })
        return links
    }, [])

    React.useEffect(() => {
        if (!md) {
            if (isHome) {
                const handler = () => {
                    divs.forEach((el, i) => {
                        let position = document.querySelector(el).getBoundingClientRect()
    
                        const fullyVisible = position.top >= 0 && position.bottom <= window.innerHeight
                        const partiallyVisible = position.top < window.innerHeight && position.bottom >= 0
    
                        if (window.pageYOffset > 0) {
                            if (fullyVisible || partiallyVisible)
                                navlinksRef.current[i].classList.add('active')
                            else navlinksRef.current[i].classList.remove('active')
                        } else navlinksRef.current[i].classList.remove('active')
                    })
                }
    
                if (scrollDirection === 'up') {
                    window.addEventListener('scroll', handler)
                    return () => window.removeEventListener('scroll', handler)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollDirection, isHome, md])

    /**
     * 
     */

    return (
        <Header scrollDirection={scrollDirection} scrolledToTop={scrolledToTop} ref={navRef}>
            <Nav>
                <div className="logo-container" tabIndex="-1">
                    <Link to="/" aria-label="home">
                        <Logo />
                    </Link>
                </div>
                <div className='nav-container'>
                    {tabs &&
                        <NavLinks>
                            {tabs.map(({ url, name }, i) => {
                                return (
                                    <li className={`navlink navlink-${i}`} key={i}>
                                        <Link to={url} ref={el => navlinksRef.current[i] = el}>{name}</Link>
                                    </li>
                                )
                            })}
                        </NavLinks>
                    }
                    <div className='nav-tools'>
                        <ThemeToggle />
                        <Share />
                        {/* <PlayerIcon /> */}
                        <NavbarToggle onClick={onNavClick} open={open} />
                    </div>
                </div>
                <Sidebar className={addClass(open, 'open')}>
                    {tabs &&
                        tabs.map(({ url, name }, i) => {
                            return (
                                <div className='sidebar-links' key={i}>
                                    <Link to={url} onClick={onNavClick}>{name}</Link>
                                </div>
                            )
                        })}
                    <OutlinedLinkButton onClick={onNavClick} to="/cv-alexandre-vurbier.pdf">
                        Curriculumn PDF
                    </OutlinedLinkButton>
                    <OutlinedLinkButton onClick={onNavClick} to="/curriculum">
                        Curriculumn HTML
                    </OutlinedLinkButton>
                </Sidebar>
            </Nav>
        </Header>
    )
}

export default React.memo(Navbar);

/**
 * 
 */

const Header = styled.header`
    position         : fixed;
    top              : 0;
    z-index          : 11;
    width            : 100vw;
    height           : 100px;
    background-color : transparent;
    filter           : none;
    pointer-events   : auto;
    user-select      : auto;
    backdrop-filter  : blur(10px);
    transition       : var(--transition);

    ${props =>
        props.scrollDirection === 'up' &&
        !props.scrolledToTop &&
        css`
            height           : 70px;
            transform        : translateY(0px);
            background-color : rgba(var(--navbar-rgb), 0.7);
            box-shadow       : var(--shadow-smooth);
    `};
    ${props =>
        props.scrollDirection === 'down' &&
        !props.scrolledToTop &&
        css`
            height           : 70px;
            transform        : translateY(calc(70px * -1));
            box-shadow       : var(--shadow-smooth);
    `};
`;

/**
 * 
 */

const Nav = styled.nav`
    position        : relative;
    display         : flex;
    align-items     : center;
    justify-content : space-between;
    width           : 100%;
    max-width       : 100vw;
    height          : 100%;
    padding         : 0 50px;
    color           : var(--text);
    font-family     : var(--font-fam1);
    counter-reset   : item 0;
    z-index         : 12;

    .logo-container {
        width   : 50px;
        height  : 50px;
        z-index : 100;

        a {
            color  : var(--primary);
            width  : 100%;
            height : 100%;

            &:hover,
            &:focus {
                svg {
                    fill   : var(--primary-light);
                }
            }
            svg {
                width       : 50px;
                height      : 45px;
                fill        : var(--primary);
                transition  : var(--transition);
                user-select : none;
            }
        }
    }

    @media(max-width:992px) {
        padding : 0 10px 0 15px;
    }

    .nav-container {
        display : flex;
        z-index : 100;
    }
    
    .nav-tools {
        position     : relative;
        display      : flex;
        align-items  : center;
        padding-left : 5px;
        margin-left  : 5px;

        &:before {
            content          : '';
            position         : absolute;
            left             : 0;
            top              : 50%;
            transform        : translateY(-50%);
            height           : 20px;
            width            : 1px;
            background-color : var(--light-border);
        }

        @media(max-width:992px) {
            &:before {
                content : none;
            }
        }
    }
`;

/**
 * 
 */

const NavLinks = styled.ul`
        display     : flex;
        align-items : center;
        padding     : 0;
        margin      : 0;
        list-style  : none;

        li {
            position          : relative;
            display           : flex;
            align-items       : center;
            justify-content   : center;
            margin            : 0 5px;
            counter-increment : item 1;
            font-size         : var(--font-sm);
            height            : 100%;

            a {
                position    : relative;
                font-weight : 500;
                padding     : 10px;
                display     : flex;
                align-items : center;
                line-height : 20px;
                overflow    : hidden;
                font-family : var(--font-fam2);
                transition  : var(--transition);

                &:before {
                    content      : '0' counter(item) '.';
                    margin-right : 5px;
                    color        : var(--primary);
                    font-size    : var(--font-sm);
                    text-align   : right;
                    transition   : var(--transition);
                    position     : relative;
                    left         : 0
                }

                &:after {
                    content     : '0' counter(item) '.';
                    position    : absolute;
                    right       : -39px;
                    top         : 50%;
                    transform   : translateY(-56%);
                    font-size   : 35px;
                    color       : var(--primary);
                    transition  : var(--transition);
                    opacity     : 0;
                }

                &:hover,
                &.active {
                    color         : var(--primary);
                    border-radius : var(--rounded-md);
                    padding-right : 20px;
                    padding-left  : 0;
                    &:before {
                        position : relative;
                        left     : -10px;
                        opacity  : 0;
                    }
                    &:after {
                        opacity : 0.25;
                        right   : -29px;
                    }
                }
            }
        }

    @media (max-width: 992px) {
        display : none;
    }
`;

/**
 * 
 */

const Sidebar = styled.div`
    display          : none;
    position         : fixed;
    top              : 0;
    bottom           : 0;
    right            : -110%;
    width            : min(75vw, 400px);
    height           : 100vh;
    flex-direction   : column;
    justify-content  : center;
    align-items      : center;
    padding          : 50px 10px;
    height           : 100vh;
    background-color : var(--navbar);
    z-index          : 12;
    transform        : translateX(0vw);
    visibility       : visible;
    transition       : var(--transition);
    box-shadow       : var(--shadow-right);

    &.open {
        right : 0;
    }

    .sidebar-links {
        position          : relative;
        counter-increment : item 1;
        font-size         : var(--font-lg);
        color             : var(--text);
        width             : 100%;

        &:last-of-type {
            margin-bottom : 40px;
        }

        a {
            position    : relative;
            display     : inline-block;
            color       : inherit;
            width       : 100%;
            padding     : 3px 20px 20px;
            text-align  : center;
            font-family : var(--font-fam2);
            overflow    : hidden;

            &:before {
                display    : inline-block;
                width      : 100%;
                text-align : center;
                content    : '0' counter(item) '.';
                color      : var(--primary);
                position   : relative;
                left       : 0;
                transition : var(--transition);
            }

            &:hover {
                color : var(--primary);
            }
        }
    }

    button {
        min-width : 295px;
        margin    : 5px 0;
    }

    @media (max-width: 992px) {
        display : flex;
    }

    @media (max-width: 576px) {
        width : min(100vw, 576px);
    }
`;