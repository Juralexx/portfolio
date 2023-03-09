import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Icon from 'components/tools/icons/Icon';
import RubberTitle from 'components/tools/RubberTitle';
import { useMultipleReveal } from 'components/hooks/useAnimation';
import { useMainProjects } from 'components/data/projects';
import HeroLine from 'components/tools/HeroLine';

const Projects = () => {
    const data = useMainProjects()
    const projects = data.featured.edges.filter(({ node }) => node)

    useMultipleReveal(['#projects .section__title', '.project-image', '.project-overline', '.project-title', '.project-tech-list', '.project-description', '.project-links'])

    return (
        <ProjectsContainer id='projects'>
            <HeroLine
                start={'projects-up__title'}
                startAnchor={{ position: 'top', offset: { y: -320, x: 30 } }}
                end={'projects-up__title'}
                endAnchor={{ position: 'top', offset: { y: -20, x: 0 } }}
            />
            <HeroLine
                start={'projects-up__title'}
                startAnchor={{ position: 'top', offset: { y: -32, x: 0 } }}
                end={'projects'}
                endAnchor={{ position: 'right', offset: { y: -450, x: 30 } }}
                showTail={false}
                curveness={1}
                _cpy1Offset={-400}
                // _cpy2Offset={500}
                _cpx1Offset={50}
                _cpx2Offset={800}
            />
            <ProjectGrid data-name="Projets">
                <p className='up__title' id="projects-up__title">
                    Projets
                </p>
                <RubberTitle
                    title="Quelques projets..."
                    className='section__title'
                    HTMLElement='h2'
                />
                {projects &&
                    projects.map(({ node }, i) => {
                        const { frontmatter, html } = node
                        const { external, title, tech, github, cover } = frontmatter
                        const image = getImage(cover)
                        return (
                            <Project key={i}>
                                <div className="project-image" id={`project-image-${i}`}>
                                    <a href={external ? external : github ? github : '#'}>
                                        <GatsbyImage image={image} alt={title} className="img" />
                                    </a>
                                </div>
                                <div className="project-content">
                                    <p className="project-overline">
                                        Featured Project
                                    </p>
                                    <h3 className="project-title">
                                        <a href={external}>{title}</a>
                                    </h3>
                                    {tech.length && (
                                        <ul className="project-tech-list">
                                            {tech.map((tech, i) => (
                                                <li key={i}>{tech}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="project-description">
                                        <div dangerouslySetInnerHTML={{ __html: html }}></div>
                                    </div>
                                    <div className="project-links">
                                        {github && (
                                            <a href={github} aria-label="GitHub Link">
                                                <Icon name="GithubOutlined" />
                                            </a>
                                        )}
                                        {external && (
                                            <a href={external} aria-label="External Link" className="external">
                                                <Icon name="External" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Project>
                        );
                    })}
            </ProjectGrid>
        </ProjectsContainer>
    );
};

export default Projects;

const ProjectsContainer = styled.div`
    position : relative;
    width    : 100%;
    margin   : 0 auto;
    padding  : 100px;
    z-index  : 2;

    @media(max-width:992px) {
        padding : 100px 50px;
    }

    @media(max-width:768px) {
        padding : 100px 15px;
    }

    &:after {
        content    : '';
        position   : absolute;
        width      : 100%;
        height     : 100%;
        bottom     : 0;
        left       : 0;
        right      : 0;
        background : linear-gradient(15deg, var(--body) 40%, rgba(var(--body-rgb), 0) 73%);
        z-index    : -1;
    }

    &:before {
        content    : '';
        position   : absolute;
        width      : 100%;
        height     : 100%;
        top        : 0;
        right      : 0;
        background : linear-gradient(to left, var(--body) 10%, rgba(var(--body-rgb), 0) 50%);
        z-index    : -1;
    }

    .section__title {
        margin-bottom : 30px;
    }
`;

export const ProjectGrid = styled.div`
    width     : 100%;
    max-width : 1200px;
    margin    : 0 auto;

    &:before {
        content        : attr(data-name);
        position       : absolute;
        left           : 0;
        top            : 60%;
        font-size      : 260px;
        font-weight    : 900;
        opacity        : 0.06;
        font-family    : var(--font-fam2);
        letter-spacing : -15px;
        color          : rgba(var(--primary-rgb), 1);
        width          : auto;
        height         : auto;
        z-index        : 1;

        @media(max-width:1200px) {
            font-size : 200px;
        }
    }
    &:after {
        content          : '';
        position         : absolute;
        top              : -100px;
        left             : 10%;
        height           : 500px;
        width            : 50%;
        background-color : rgba(var(--body-rgb), 1);
        filter           : blur(80px);
        z-index          : -1;
    }
    a {
        position: relative;
        z-index: 1;
    }
`;

export const Project = styled.div`
    position              : relative;
    display               : grid;
    grid-gap              : 10px;
    grid-template-columns : repeat(12, 1fr);
    align-items           : center;

    .project-content {
        position    : relative;
        grid-column : 1 / 8;
        grid-row    : 1 / -1;
        text-align  : left;
        z-index     : 2;

        @media (max-width: 1080px) {
            grid-column : 1 / 9;
        }
        @media (max-width: 992px) {
            display         : flex;
            flex-direction  : column;
            justify-content : center;
            height          : 100%;
            grid-column     : 1 / -1;
            padding         : 40px 40px 30px;
            z-index         : 5;
        }
        @media (max-width: 480px) {
            padding : 30px 25px 20px;
        }
    }
    .project-overline {
        margin      : 10px 0;
        color       : var(--primary);
        font-family : var(--font-fam2);
        font-size   : var(--font-sm);
        font-weight : 400;
        text-align  : left;
    }
    .project-title {
        color       : var(--text-secondary);
        font-size   : clamp(24px, 5vw, 28px);
        text-shadow : 2px 2px 0px var(--primary);
        text-align  : left;

        @media (min-width: 992px) {
            margin : 0 0 20px;
        }
        @media (max-width: 992px) {
            color : var(--text);
            a {
                position: static;
                &:before {
                    content  : '';
                    display  : block;
                    position : absolute;
                    z-index  : 0;
                    width    : 100%;
                    height   : 100%;
                    top      : 0;
                    left     : 0;
                }
            }
        }
    }
    .project-description {
        position        : relative;
        box-shadow      : var(--shadow-two);
        > div {
            width           : 100%;
            height          : 100%;
            background      : rgba(var(--primary-rgb), 0.12);
            backdrop-filter : blur(10px);
            border          : 1px solid var(--primary);
            padding         : 20px 25px;
            color           : var(--text);
            border-radius   : var(--rounded-sm);
            z-index         : 100;

            @media (max-width: 992px) {
                padding          : 20px 0;
                background-color : transparent;
                backdrop-filter  : none;
                border           : none;
                box-shadow       : none;
            }
        }
        &:after {
            content    : '';
            position   : absolute;
            width      : 100%;
            height     : 100%;
            top        : 0;
            left       : 0;
            background : rgba(var(--body-rgb), 0.50);
            z-index    : -100;
        }
        @media(max-width: 992px) {
            &:after {
                content : none;
            }
        }
    }
    .project-tech-list {
        display         : flex;
        flex-wrap       : wrap;
        justify-content : flex-start;
        position        : relative;
        text-align      : right;
        z-index         : 2;
        margin          : 25px 0 10px;
        padding         : 0;
        list-style      : none;
        li {
            margin      : 0 20px 5px 0;
            color       : var(--primary);
            font-family : var(--font-fam2);
            font-size   : var(--font-sm);
            white-space : nowrap;
        }
        @media (max-width: 992px) {
            li {
                margin : 0 10px 5px 0;
            }
        }
    }
    .project-links {
        display     : flex;
        align-items : center;
        position    : relative;
        margin-top  : 10px;
        margin-left : -10px;
        a {
            padding : 10px;
            &.external {
                svg {
                    width      : 22px;
                    height     : 22px;
                    margin-top : -4px;
                }
            }
            svg {
                width  : 20px;
                height : 20px;
                color  : var(--primary);
            }
        }
        .cta {
            margin : 10px;
        }
    }
    .project-image {
        grid-column : 6 / -1;
        grid-row    : 1 / -1;
        position    : relative;
        box-shadow  : var(--shadow-two);

        @media (max-width: 992px) {
            grid-column : 1 / -1;
            height      : 100%;
            opacity     : 1;
        }
        a {
            display          : block;
            width            : 100%;
            height           : 100%;
            background-color : rgba(var(--primary-rgb), 0.4);
            &:hover,
            &:focus {
                background : transparent;
                outline    : 0;
                &:before, .img {
                    background : transparent;
                    filter     : none;
                }
            }
            &:before {
                content               : '';
                position              : absolute;
                width                 : 100%;
                height                : 100%;
                top                   : 0;
                left                  : 0;
                right                 : 0;
                bottom                : 0;
                z-index               : 3;
                transition            : var(--transition);
                background-blend-mode : hard-light;
            }
        }
        .img {
            mix-blend-mode : multiply;
            filter         : grayscale(100%) contrast(1) brightness(80%);

            @media (max-width: 992px) {
                object-fit : cover;
                width      : 100%;
                height     : 100%;
                filter     : grayscale(100%) contrast(1) brightness(50%);
            }
        }
    }
    &:not(:last-of-type) {
        margin-bottom : 100px;

        @media (max-width: 992px) {
            margin-bottom : 70px;
        }
        
        @media (max-width: 480px) {
            margin-bottom : 30px;
        }
    }
    &:nth-of-type(odd) {
        .project-overline,
        .project-title {
            text-align : right;

            @media (max-width: 992px) {
                text-align : left;
            }
        }
        .project-content {
            grid-column : 6 / -1;
            text-align  : left;
            z-index     : 2;

            @media (max-width: 1080px) {
                grid-column : 5 / -1;
            }
            @media (max-width: 992px) {
                grid-column : 1 / -1;
                padding     : 40px 40px 30px;
                text-align  : left;
            }
            
            @media (max-width: 480px) {
                padding : 25px 25px 20px;
            }
        }
        .project-tech-list {
            justify-content : flex-end;

            @media (max-width: 992px) {
                justify-content : flex-start;
            }
            li {
                margin : 0 0 5px 20px;
                @media (max-width: 992px) {
                    margin : 0 10px 5px 0;
                }
            }
        }
        .project-links {
            justify-content : flex-end;
            margin-left     : 0;
            margin-right    : -10px;

            @media (max-width: 992px) {
                justify-content : flex-start;
                margin-left     : -10px;
                margin-right    : 0;
            }
        }
        .project-image {
            grid-column   : 1 / 8;
            z-index       : 1;

            @media (max-width: 992px) {
                grid-column : 1 / -1;
            }
            a {
                display : block;
            }
        }
    }
`;