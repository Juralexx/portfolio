import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { SmallNavbar, SmallNavButton } from 'components/tools/SmallNavbar';
import FormProjects from 'components/FormProjects';
import Icon from 'components/tools/icons/Icon';
import { OutlinedButton, OutlinedLinkButton } from 'components/tools/global/Buttons/OutlinedButton';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addClass } from 'Utils'
import { useProjectsToShow } from 'components/data/other-projects';
import useLocalStorage from 'components/tools/hooks/useLocalStorage';
import { scrollreveal, scrollrevealConfig, useMultipleReveal } from 'components/hooks/useAnimation';
import { entreprise_sites } from '__config';
import HeroLine from 'components/tools/HeroLine';

const OthersProjects = () => {
    const revealProjects = React.useRef([])
    React.useEffect(() => revealProjects.current.slice(0, 6).forEach((ref, i) => scrollreveal.reveal(ref, scrollrevealConfig(i * 100))), [])
    useMultipleReveal(['#others-projects .custom-link', '#others-projects .small-nav'])

    const projectsDatas = useProjectsToShow()
    const GRID_LIMIT = 9
    const GRID_MAX_LIMIT = 30
    const [storage, setStorage] = useLocalStorage('projects-type', 'personal')
    const [projects, setProjects] = React.useState({
        type: storage ? storage : 'personal',
        datas: storage ? (storage === 'personal' ? projectsDatas.personal.edges : []) : projectsDatas.personal.edges
    })
    const [showMore, setShowMore] = React.useState(false)
    const projectsToShow = showMore ? projects.datas : projects.datas.slice(0, GRID_LIMIT)

    return (
        <ProjectsContainer id='others-projects'>
            <HeroLine
                start={'others-projects'}
                startAnchor={{ position: 'top', offset: { y: -200, x: 2000 } }}
                end={'others-projects-title'}
                endAnchor={{ position: 'top', offset: { y: -20, x: 0 } }}
                showTail={false}
                _cpy1Offset={400}
                _cpy2Offset={-250}
            />
            <div className='others__projects-container'>
                <div className='projects-container'>
                    <h2 id="others-projects-title">
                        Quelques autres projets
                    </h2>
                    <Link className="custom-link" to="/projects">
                        Voir tous les projets
                    </Link>
                    <SmallNavbar>
                        <SmallNavButton className={addClass(projects.type === 'personal', 'active')}
                            onClick={() => {
                                if (projects.type !== 'personal') {
                                    setProjects({ type: 'personal', datas: projectsDatas.personal.edges })
                                    setStorage('personal')
                                }
                            }}>
                            Personnels <span>{projectsDatas.personal.edges.length}</span>
                        </SmallNavButton>
                        <SmallNavButton className={addClass(projects.type === 'company', 'active')}
                            onClick={() => {
                                if (projects.type !== 'company') {
                                    setProjects({ type: 'company', datas: [] })
                                    setStorage('company')
                                }
                            }}>
                            Entreprises <span>{entreprise_sites.length}</span>
                        </SmallNavButton>
                    </SmallNavbar>

                    <ul className="projects-grid">
                        <TransitionGroup component={null}>
                            {projectsToShow &&
                                projects.type === 'personal' ? (
                                projectsToShow.map(({ node }, i) => {
                                    const { frontmatter, html } = node
                                    const { github, external, title, tech, image } = frontmatter
                                    const img = getImage(image)
                                    return (
                                        <CSSTransition
                                            key={i}
                                            classNames="fadeup"
                                            timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                                            exit={false}
                                        >
                                            <Card key={i}
                                                ref={ref => revealProjects.current[i] = ref}
                                                style={{ transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms` }}
                                            >
                                                <div className="project-inner">
                                                    <div className="project-top">
                                                        <div className="folder">
                                                            <Icon name="Folder" />
                                                        </div>
                                                        <div className="project-links">
                                                            {github && (
                                                                <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                                                                    <Icon name="GithubOutlined" />
                                                                </a>
                                                            )}
                                                            {external && (
                                                                <a href={external} className="external" aria-label="External Link" target="_blank" rel="noreferrer">
                                                                    <Icon name="External" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {image &&
                                                        <div className='project-img'>
                                                            <GatsbyImage image={img} alt={title} className="img" />
                                                        </div>
                                                    }
                                                    <h3 className="project-title">
                                                        <a href={external} target="_blank" rel="noreferrer">{title}</a>
                                                    </h3>
                                                    <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
                                                    {tech && (
                                                        <ul className={`project-tech-list ${projects.type === 'company' && 'reduced'}`}>
                                                            {tech.map((tech, i) => (
                                                                <li key={i}>{tech}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </Card>
                                        </CSSTransition>
                                    )
                                })
                            ) : (
                                projectsToShow.slice(0, GRID_MAX_LIMIT).map((project, i) => {
                                    return (
                                        <CSSTransition
                                            key={i}
                                            classNames="fadeup"
                                            timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                                            exit={false}
                                        >
                                            <Card key={i} style={{ transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms` }}>
                                                <div className="project-inner entreprise">
                                                    <div className="project-top">
                                                        <div className="folder">
                                                            <Icon name="Globe" />
                                                        </div>
                                                        <div className="project-links">
                                                            <a href={project.url} className="external" aria-label="External Link" target="_blank" rel="noreferrer">
                                                                <Icon name="External" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <h3 className="project-title">
                                                        <a href={project.url} target="_blank" rel="noreferrer">
                                                            {project.name}
                                                        </a>
                                                    </h3>
                                                    <ul className='project-tech-list reduced'>
                                                        {['Drupal', 'HTML', 'CSS', 'Sass', 'Javascript']
                                                            .map((tech, i) => (
                                                                <li key={i}>{tech}</li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            </Card>
                                        </CSSTransition>
                                    )
                                })
                            )}
                        </TransitionGroup>
                    </ul>

                    {projects.datas.length > 6 &&
                        <OutlinedButton className="more__button show__more" onClick={() => setShowMore(!showMore)}>
                            Voir {showMore ? 'moins' : 'plus'}
                        </OutlinedButton>
                    }
                    {projects.datas.length > GRID_MAX_LIMIT &&
                        <OutlinedLinkButton to="/projects" className="more__button">
                            Voir tout
                        </OutlinedLinkButton>
                    }
                    {projects.datas.length === 0 &&
                        <FormProjects
                            projects={projects}
                            onValidation={() => setProjects(prev => ({ ...prev, datas: entreprise_sites }))}
                        />
                    }
                </div>
            </div>
        </ProjectsContainer>
    )
}

export default OthersProjects

const ProjectsContainer = styled.div`
    position : relative;
    padding  : 100px  50px;
    z-index  : 3;

    @media(max-width:768px) {
        padding : 100px 15px;
    }

    .others__projects-container {
        width     : 100%;
        max-width : 1200px;
        margin    : 0 auto;
    }

    h2 {
        text-align : center;
    }

    &:after {
        content    : '';
        position   : absolute;
        width      : 100%;
        height     : 100%;
        top        : 0;
        right      : 0;
        background : linear-gradient(to bottom, var(--body) 10%, rgba(var(--body-rgb), 0) 60%);
        z-index    : -1;
    }

    &:before {
        content    : '';
        position   : absolute;
        width      : 100%;
        height     : 70%;
        bottom     : 0;
        left       : 0;
        right      : 0;
        background : linear-gradient(to top, var(--body) 30%, rgba(var(--body-rgb), 0) 70%);
        z-index    : -1;
    }

    .projects-container {
        margin          : 0 auto;
        display         : flex;
        flex-direction  : column;
        justify-content : center;
        align-items     : center;
    }

    .projects-grid {
        position              : relative;
        /* display               : grid; */
        /* grid-template-columns : repeat(3, minmax(250px, 1fr)); */
        /* grid-gap              : 15px; */
        column-gap   : 15px;
        column-fill  : initial;
        margin-top   : 30px;
        column-count : 3;

        @media only screen and (min-width: 577px) and (max-width: 992px) {
            column-count : 2;
        }
        @media only screen and (max-width: 576px) {
            column-count : 1;
        }

        /* @media (max-width: 992px) {
            grid-template-columns : repeat(2, minmax(250px, 1fr));
        }
        @media (max-width: 576px) {
            grid-template-columns : repeat(1, minmax(250px, 1fr));
        } */
    }

    .more__button {
        margin    : 10px auto 0;
        min-width : 222px;
        &.show__more {
            margin-top : 50px;
        }
    }
`;

const Card = styled.li`
    position       : relative;
    transition     : var(--transition);
    width          : 100%;
    margin-bottom  : 15px;
    display        : inline-block;
    vertical-align : top;

    .project-inner {
        position         : relative;
        display          : flex;
        flex-direction   : column;
        justify-content  : space-between;
        align-items      : flex-start;
        height           : 100%;
        padding          : 25px;
        background-color : rgba(var(--primary-rgb), 0.12);
        backdrop-filter  : blur(5px);
        border           : 1px solid var(--primary);
        border-radius    : var(--rounded-sm);
        box-shadow       : var(--shadow-smooth), var(--shadow-relief);
        transition       : var(--transition);

        &.entreprise {
            .project-top {
                margin-bottom : 10px;
            }
            .project-title {
                margin : 0;
            }
        }
    }

    .project-top {
        display         : flex;
        justify-content : space-between;
        margin-bottom   : 15px;
        width           : 100%;

        .folder {
            color : var(--primary);
            svg {
                width  : 36px;
                height : 36px;
            }
        }

        .project-links {
            display      : flex;
            align-items  : center;
            margin-right : -10px;
            color        : var(--text);

            a {
                display         : flex;
                align-items     : center;
                justify-content : center;
                padding         : 5px 7px;

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
                }
            }
        }
    }

    .project-img {
        position      : relative;
        width         : 100%;
        height        : auto;
        margin-bottom : 15px;
        overflow      : hidden;

        &:before {
            position         : absolute;
            content          : '';
            width            : 100%;
            height           : 100%;
            border-radius    : var(--rounded-sm);
            background-color : rgba(var(--primary-rgb), 0.2);
            z-index          : 2;
        }

        .img {
            object-fit : cover;
            width      : 100%;
            height     : 100%;
        }
    }

    .project-title {
        margin      : 0 0 10px;
        font-size   : 19px;
        line-height : 25px;
        z-index     : 2;

        a {
            /* position   : static; */
            position   : relative;
            transition : var(--transition);

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

    .project-tech-list {
        display     : flex;
        align-items : flex-end;
        flex-grow   : 1;
        flex-wrap   : wrap;
        padding     : 0;
        margin      : 20px 0 0 0;
        color       : var(--text-secondary);

        li {
            font-family : var(--font-fam2);
            font-size   : 14px;
            line-height : 18px;

            &:not(:last-of-type) {
                margin-right : 12px;
            }
        }

        &.reduced {
            margin : 5px 0 0;
        }
    }

    &:hover,
    &:focus-within {
        .project-inner {
            transform        : translateY(-7px);
            background-color : rgba(var(--primary-rgb), 0.2);
            border           : 1px solid var(--primary);
        }
        .project-title {
            a {
                color : var(--primary);
            }
        }
        .project-img {
            &:before {
                content : none;
            }
        }
    }
`;