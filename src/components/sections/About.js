import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { scrollreveal, scrollrevealConfig, useMultipleReveal } from 'components/hooks/useAnimation';
import useMediaQuery from 'components/tools/hooks/useMediaQuery';
import RubberTitle from 'components/tools/RubberTitle';
import Sphere from 'components/tools/Sphere';
import StarrySky from 'components/tools/StarrySky';
import Icon from 'components/tools/icons/Icon';
import { languages } from 'components/data/languages';
import HeroLine from 'components/tools/HeroLine';

const Intro = () => {
    const sm = useMediaQuery('(max-width: 768px)')
    useMultipleReveal(['#about .section__title', '#about .about__description', '#about .tag__sphere'], 300)

    const revealTags = React.useRef([])
    React.useEffect(() => {
        if (sm)
            revealTags.current.forEach((ref, i) => scrollreveal.reveal(ref, scrollrevealConfig(i * 100)))
    }, [sm])

    const text = useStaticQuery(graphql`
        query {
            allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/sections/about/" } }) {
                edges {
                    node {
                        html
                    }
                }
            }
        }
    `);

    const { html } = text.allMarkdownRemark.edges[0].node

    return (
        <About id='about' data-name="À Propos">
            <HeroLine
                start={'about-up__title'}
                startAnchor={{ position: 'top', offset: { y: -30, x: 0 } }}
                end={'about'}
                endAnchor={{ position: 'top', offset: { y: -20, x: 0 } }}
                showTail={false}
            />
            <AboutContainer>
                <AboutText id='about-text'>
                    <p className='up__title' id="about-up__title">
                        À propos
                    </p>
                    <RubberTitle
                        title='En quelques mots...'
                        className='section__title'
                        HTMLElement='h2'
                    />
                    <div
                        className='about__description'
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </AboutText>
                <Languages>
                    <WordCloud>
                        {sm ? (
                            languages.map((language, i) => {
                                return (
                                    <div className='__word' key={i} ref={ref => revealTags.current[i] = ref}>
                                        <Icon
                                            name={language.data_icon}
                                            className={`${language.class}`}
                                            data-name={language.data_title}
                                        />
                                        <div className='__word-title'>
                                            {language.data_title}
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className='tag__sphere'>
                                <Sphere />
                            </div>
                        )}
                    </WordCloud>
                    <StarrySky />
                </Languages>
            </AboutContainer>
        </About>
    )
}

export default React.memo(Intro);

const About = styled.div`
    position      : relative;
    width         : 100%;
    padding       : 30px 20px 30px 100px;
    background    : linear-gradient(90deg, var(--body), var(--body-light));
    border-top    : 1px solid var(--light-border);
    border-bottom : 1px solid var(--light-border);
    overflow      : hidden;
    z-index       : 4;

    &:before {
        content        : attr(data-name);
        position       : absolute;
        left           : 0;
        bottom         : -110px;
        font-size      : 260px;
        font-weight    : 900;
        opacity        : 0.06;
        font-family    : var(--font-fam2);
        letter-spacing : -15px;
        word-spacing   : -100px;
        color          : rgba(var(--primary-rgb), 1);
        width          : 100%;
        height         : auto;
        white-space    : nowrap;
        z-index        : -1;
    }

    @media(max-width: 1200px) {
        padding : 100px 50px;
    }
    @media(max-width: 992px) {
        background : linear-gradient(to bottom, var(--body), var(--body-light));
        &:before {
            font-size    : 200px;
            bottom       : -80px;
            word-spacing : -40px;
        }
    }
    @media(max-width: 768px) {
        padding : 100px 15px;
    }
`;

const AboutContainer = styled.div`
    position    : relative;
    width       : 100%;
    display     : flex;
    align-items : center;

    @media(max-width: 992px) {
        flex-direction : column;
    }
`;

const AboutText = styled.div`
    position : relative;
    width    : 50%;

    @media(max-width: 992px) {
        width : 100%;
    }

    p:not(.up__title) {
        margin      : 0px 0px 15px;
        line-height : 30px;
        font-size   : 18px;
        color       : var(--text);
    }

    a {
        color : var(--primary);
    }
`;

const Languages = styled.div`
    position : relative;
    width    : 50%;

    @media(max-width: 992px) {
        width : 100%;
    }

    .tag__sphere {
        position : relative;
        width    : 100%;

        > div {
            transform  : scale(0.9);
            position   : absolute;
            max-height : 720px;
            min-height : 720px !important;
            width      : 100% !important;
            margin     : 0 auto;
        }

        .sphere__icon {
            cursor  : pointer;
            z-index : 1;

            svg {
                width  : 60px;
                height : 60px;
                color  : var(--primary);
                cursor : pointer;
            }

            .sphere__icon-name {
                display     : none;
                text-align  : center;
                font-size   : 22px;
                font-weight : bold;
                color       : var(--primary);
                font-family : var(--font-fam2);
            }

            &:hover {
                width            : auto;
                min-width        : 100px;
                min-height       : 100px;
                padding          : 80px 10px 10px;
                background-color : rgba(var(--primary-rgb), 0.1);
                backdrop-filter  : blur(10px);
                border           : 1px solid var(--primary);
                border-radius    : var(--rounded-md);
                overflow         : hidden;
                z-index          : 2;

                svg {
                    position  : absolute;
                    top       : -40px;
                    left      : 50%;
                    transform : translate(-50%);
                    width     : 100px;
                    height    : 100px;
                    opacity   : 0.5;
                }

                .sphere__icon-name {
                    display : block;
                }
            }
        }
    }
`

const WordCloud = styled.div`
    display         : flex;
    flex-wrap       : wrap;
    margin-top      : 30px;

    .__word {
        display          : flex;
        align-items      : center;
        justify-content  : center;
        padding          : 10px 12px;
        border-radius    : 5px;
        background-color : rgba(var(--primary-rgb), 0.08);
        border    : 1px solid var(--primary);
        margin    : 0 14px 14px 0;
        flex-grow : 1;
        color       : var(--primary);

        svg {
            width        : 22px;
            height       : 22px;
            margin-right : 10px;
        }
    }

    .__word-title {
        font-size   : 20px;
        line-height : 20px;
        padding-top : 2px;
    }
`