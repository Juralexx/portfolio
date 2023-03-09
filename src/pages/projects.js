import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Head from 'Head';
import Root from 'Root';
import Main from 'components/Main';
import Breadcrumbs from 'components/tools/Breadcrumb';
import { SmallNavbar } from 'components/tools/SmallNavbar';
import FormProjects from 'components/FormProjects';
import Icon from 'components/tools/icons/Icon';
import Ripple from 'components/tools/global/Buttons/Ripple';
import { addActive } from 'Utils'
import { scrollreveal, scrollrevealConfig } from 'components/hooks/useAnimation';
import { useSiteDatas } from 'components/data/site';
import { useAllProjects } from 'components/data/all-projects';
import useLocalStorage from 'components/tools/hooks/useLocalStorage';
import { entreprise_sites } from '__config';

const ProjectsPage = ({ location }) => {
    const revealProjects = React.useRef([])

    React.useEffect(() => {
        scrollreveal.reveal('.__heading', scrollrevealConfig())
        scrollreveal.reveal('#table', scrollrevealConfig(200, 0))
        revealProjects.current.forEach((ref, i) => scrollreveal.reveal(ref, scrollrevealConfig(i * 10)))
    }, [])

    /**
     * 
     */

    const siteDatas = useSiteDatas()
    const projectsDatas = useAllProjects()
    const [storage, setStorage] = useLocalStorage('projects-type', 'personal')
    const [projects, setProjects] = React.useState({
        type: storage ? storage : 'personal',
        datas: storage ? (storage === 'personal' ? projectsDatas.personal.edges : []) : projectsDatas.personal.edges
    })

    /**
     * 
     */

    return (
        <Root location={location}>
            <Head title='Projets' />

            <Main>
                <ProjectsContainer className='container-lg'>
                    <div className='__heading'>
                        <h1>Projets</h1>
                        <Breadcrumbs denomination={siteDatas.author} description="Projets" />
                        <p className="__subtitle">Quelques projets sur lesquels j'ai travaillé...</p>
                    </div>
                    <SmallNavbar>
                        <button
                            className={addActive(projects.type === 'personal')}
                            onClick={() => {
                                if (projects.type !== 'personal') {
                                    setProjects({ type: 'personal', datas: projectsDatas.personal.edges })
                                    setStorage('personal')
                                }
                            }}
                        ><span></span>
                            <Ripple />
                            Personnels <span>{projectsDatas.personal.edges.length}</span>
                        </button>
                        <button
                            className={addActive(projects.type === 'company')}
                            onClick={() => {
                                if (projects.type !== 'company') {
                                    setProjects({ type: 'company', datas: [] })
                                    setStorage('company')
                                }
                            }}
                        ><span></span>
                            <Ripple />
                            Entreprises <span>{entreprise_sites.length}</span>
                        </button>
                    </SmallNavbar>

                    <TableContainer id='table'>
                        {projects.datas.length > 0 &&
                            <table>
                                <thead>
                                    <tr>
                                        <th>Année</th>
                                        <th>Nom</th>
                                        {projects.type === 'company' &&
                                            <th className="hidden-sm">Fait à</th>
                                        }
                                        <th className="hidden-sm">Techs</th>
                                        <th>Liens</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.type === 'personal' ? (
                                        projects.datas.map(({ node }, i) => {
                                            const { date, github, external, title, tech, company } = node.frontmatter;
                                            return (
                                                <tr ref={el => (revealProjects.current[i] = el)} key={i}>
                                                    <td className="__year">
                                                        {`${new Date(date).getFullYear()}`}
                                                    </td>
                                                    <td className="__title">
                                                        {title}
                                                        <p className="__tech hidden-from-sm">
                                                            {tech.length > 0 &&
                                                                tech.map((item, i) => (
                                                                    <span key={i}>
                                                                        {item}{i !== tech.length - 1 && <span className="separator">&middot;</span>}
                                                                    </span>
                                                                ))
                                                            }
                                                        </p>
                                                    </td>
                                                    {projects.type === 'company' &&
                                                        <td className="__company hidden-sm">
                                                            {company ? <span>{company}</span> : <span>—</span>}
                                                        </td>
                                                    }
                                                    <td className="__tech hidden-sm">
                                                        {tech.length > 0 &&
                                                            tech.map((item, i) => (
                                                                <span key={i}>
                                                                    {item}{i !== tech.length - 1 && <span className="separator">&middot;</span>}
                                                                </span>
                                                            ))
                                                        }
                                                    </td>
                                                    <td className="__links">
                                                        {external &&
                                                            <a href={external} aria-label="External Link">
                                                                <Icon name="External" />
                                                            </a>
                                                        }
                                                        {github &&
                                                            <a href={github} aria-label="GitHub Link">
                                                                <Icon name="GithubOutlined" />
                                                            </a>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        projects.datas.map((project, i) => {
                                            const techs = ['Drupal', 'HTML', 'CSS', 'Sass', 'Javascript']
                                            return (
                                                <tr ref={el => (revealProjects.current[i] = el)} key={i}>
                                                    <td className="__year">
                                                        {project.year}
                                                    </td>
                                                    <td className="__title">
                                                        {project.name}
                                                        <p className="__tech hidden-from-sm">
                                                            {techs.map((item, i) => (
                                                                <span key={i}>
                                                                    {item}{i !== techs.length - 1 && <span className="separator">&middot;</span>}
                                                                </span>
                                                            ))
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className="__company hidden-sm">
                                                        {project.company ? <span>{project.company}</span> : <span>—</span>}
                                                    </td>
                                                    <td className="__tech hidden-sm">
                                                        {techs.map((item, i) => (
                                                            <span key={i}>
                                                                {item}{i !== techs.length - 1 && <span className="separator">&middot;</span>}
                                                            </span>
                                                        ))
                                                        }
                                                    </td>
                                                    <td className="__links">
                                                        <a href={project.url} aria-label="External Link">
                                                            <Icon name="External" />
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                        }
                    </TableContainer>

                    {projects.datas.length === 0 &&
                        <FormProjects
                            projects={projects}
                            onValidation={() => setProjects(prev => ({ ...prev, datas: entreprise_sites }))}
                        />
                    }
                </ProjectsContainer>
            </Main>
        </Root>
    )
}

ProjectsPage.propTypes = {
    location: PropTypes.object.isRequired,
}

export default ProjectsPage

const ProjectsContainer = styled.div`
    min-height : 750px;

    .__heading {
        padding       : 0;
        margin-bottom : 50px;
        p {
            font-size   : var(--font-md);
            font-family : var(--font-fam2);
            color       : var(--primary);
        }
    }

    .breadcrumb {
        margin-bottom : 20px;
    }

    @media (max-width: 768px) {
        .__heading {
            p {
                font-size : var(--font-sm);
            }
        }
    }
`

/**
 * 
 */

const TableContainer = styled.div`
    table {
        width           : 100%;
        border-collapse : collapse;
        margin-top      : 30px;

        thead {
            th {
                font-size   : var(--font-lg);
                color       : var(--text-tertiary);
                font-family : var(--font-fam2);

                @media (max-width: 768px) {
                    font-size : var(--font-md);
                    padding   : 15px 10px;
                }
            }
        }

        tbody {
            tr {
                &:hover, &:focus {
                    background-color : rgba(var(--primary-rgb), 0.12);
                    color            : var(--primary) !important;
                    td, svg {
                        color : var(--primary) !important;
                    }
                }
            }
        }

        th,
        td {
            padding    : 15px;
            text-align : left;

            svg {
                width  : 20px;
                height : 20px;
                color  : #8892B0;
            }

            @media (max-width: 768px) {
                padding : 15px 10px;
            }
        }

        tr {
            cursor : default;
            td {
                &:first-child {
                    border-top-left-radius    : var(--rounded-sm);
                    border-bottom-left-radius : var(--rounded-sm);
                }
                &:last-child {
                    border-top-right-radius    : var(--rounded-sm);
                    border-bottom-right-radius : var(--rounded-sm);
                }
            }
        }

        .__year {
            font-family : var(--font-fam2);
            font-size   : var(--font-md);
            font-weight : 500;
            color       : var(--primary);

            @media (max-width: 768px) {
                font-size : var(--font-md);
            }
        }

        .__title {
            font-size   : var(--font-lg);
            font-weight : 600;
            line-height : 1.25;

            @media (max-width: 768px) {
                font-size   : var(--font-md);
                line-height : 1.75;
            }
        }

        .__company {
            font-size : var(--font-md);
            color     : #8892B0;
        }

        .__tech {
            font-size   : var(--font-xs);
            font-family : var(--font-fam2);
            line-height : 1.75;
            color       : #8892B0;
            max-width   : 400px;

            .separator {
                margin : 0 5px;
            }
            span {
                display: inline-block;
            }
        }

        .__links {
            display     : flex;
            align-items : center;

            a {
                display         : flex;
                justify-content : center;
                align-items     : center;
                flex-shrink     : 0;
            }

            a + a {
                margin-left : 10px;
            }
        }
    }
`;