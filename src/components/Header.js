import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Logo from './tools/Logo';
import Icon from './tools/icons/Icon';
import { OutlinedLinkButton } from './tools/global/Buttons/OutlinedButton';
import { useReveal } from './hooks/useAnimation';
import HeroLine from './tools/HeroLine';

const Header = () => {
    const titleRef = React.useRef()

    useReveal('.__title', 2100)
    useReveal('.__subtitle', 2200)
    useReveal('.header__before', 2300)
    useReveal('.__intro', 2400)
    useReveal('#head__btn', 2500)

    const datas = useStaticQuery(graphql`
        query {
            allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/sections/header/" } }) {
                edges {
                    node {
                        frontmatter {
                            title
                            subtitle
                        }
                        html
                    }
                }
            }
        }
    `);

    const { frontmatter, html } = datas.allMarkdownRemark.edges[0].node

    return (
        <Slider>
            <SliderContainer>
                <SliderSection>
                    <SliderInner>
                        <div className="header__before">
                            <Icon name="Javascript" />
                            <Icon name="Reactjs" />
                            <Icon name="Typescript" />
                            <Icon name="NodeJS" />
                        </div>
                        <h1 ref={titleRef} className="__title">
                            {frontmatter.title}
                        </h1>
                        <h2 className='__subtitle'>
                            {frontmatter.subtitle}
                        </h2>
                        <div className="__intro" dangerouslySetInnerHTML={{ __html: html }}></div>
                        <Logo />
                        <div id="head__btn">
                            <OutlinedLinkButton to="/#about" className="head__btn">
                                En savoir plus
                            </OutlinedLinkButton>
                        </div>
                        <HeroLine
                            start={'head__btn'}
                            startAnchor={{ position: 'bottom', offset: { y: 20, x: 0 } }}
                            end={'about-up__title'}
                            endAnchor={{ position: 'top', offset: { y: -20, x: 0 } }}
                        />
                    </SliderInner>
                </SliderSection>
            </SliderContainer>
        </Slider>
    )
}

export default React.memo(Header)

const Slider = styled.div`
    position   : relative;
    min-height : 100vh;
    width      : 100%;
    z-index    : 5;

    img {
        position : absolute;
        top      : 69%;
        left     : 130px;
        height   : 480px;
        width    : auto;
        display  : block;
    }

    &:before {
        content    : '';
        position   : absolute;
        width      : 40%;
        height     : 100%;
        bottom     : 0;
        right      : 0;
        background : linear-gradient(to left, var(--body) 70%, rgba(var(--body-rgb), 0) 100%);
    }

    &:after {
        content    : '';
        position   : absolute;
        width      : 100%;
        height     : 70%;
        top        : 0;
        right      : 0;
        padding    : 50px 40px;
        background : linear-gradient(to bottom, rgba(var(--body-rgb), 1) 60%, rgba(var(--body-rgb), 0) 100%);
    }
`;

const SliderContainer = styled.div`
    position        : relative;
    min-height      : 100vh;
    width           : 100%;
    display         : flex;
    flex-direction  : column;
    justify-content : center;
    align-items     : flex-start;
    padding         : 0 100px;
    z-index         : 10 !important;

    &:after {
        content    : '';
        position   : absolute;
        bottom     : -20px;
        left       : 20%;
        height     : 200px;
        width      : 200px;
        background : rgba(var(--primary-rgb), 0.1);
        filter     : blur(80px);
    }

    @media(max-width: 992px) {
        padding : 0 50px;
    }

    @media(max-width: 768px) {
        padding : 0 15px;
    }
`;

const SliderSection = styled.div`
    position        : relative;
    display         : flex;
    flex-direction  : column;
    align-items     : flex-start;
    justify-content : center;
    min-height      : 100vh;
    padding         : 0;

    @media(max-width: 768px) {
        width : 100%;
    }

    @media (max-width: 480px) and (min-height: 700px) {
        padding-bottom : 10vh;
    }
`;

const SliderInner = styled.div`
    position  : relative;
    width     : 100%;
    max-width : 800px;

    h1 {
        font-size   : clamp(36px, 9.5vw, 70px);
        line-height : 1.1;
        margin      : 0;
        /* text-shadow : 2px 1px 0px var(--primary); */
    }

    h2 {
        font-size      : clamp(34px, 9.5vw, 60px);
        font-weight    : 700;
        line-height    : 1.1;
        letter-spacing : -1px;
        word-spacing   : -4px;
        color          : var(--primary);
        font-family    : var(--font-fam2);
        margin         : 0;
    }

    .header__before {
        position      : relative;
        display       : flex;
        align-items   : center;
        margin-bottom : 15px;
        padding-left  : 110px;
        color         : var(--primary);

        &:before {
            content          : '';
            position         : absolute;
            left             : 0;
            top              : 50%;
            transform        : translateY(-50%);
            background-color : var(--primary);
            width            : 100px;
            height           : 1px;
        }

        svg {
            height       : 24px;
            width        : 24px;
            margin-right : 10px;
            transition   : .2s;
            &:hover {
                transform : translateY(-10px) scale(1.2);
            }
        }
    }

    #head__btn {
        position : relative;
        display  : inline-block;

        button {
            background      : rgba(var(--primary-rgb), 0.1);
            box-shadow      : 0 0 15px 0 rgba(var(--primary-rgb), 0.5) inset, 0 0 15px 3px rgba(var(--primary-rgb), 0.5);
            backdrop-filter : blur(17px);

            &:hover {
                box-shadow : 0 0 15px 0 rgba(var(--primary-rgb), 0.5) inset, 0 0 25px 3px rgba(var(--primary-rgb), 0.5);
            }
        }
    }

    .__intro {
        position    : relative;
        margin      : 20px 0 30px;
        font-family : var(--font-fam2);
    }

    .logo {
        position  : absolute;
        top       : -80px;
        right     : -70px;
        height    : 300px;
        width     : 300px;
        fill      : rgba(var(--primary-rgb), 0.05);
        z-index   : -1;
    }

    @media(max-width:576px) {
        button {
            width : 100%;
        }
    }
`;