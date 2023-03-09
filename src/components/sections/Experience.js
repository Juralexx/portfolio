import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { SmallNavbar, SmallNavButton } from 'components/tools/SmallNavbar';
import RubberTitle from 'components/tools/RubberTitle';
import Icon from 'components/tools/icons/Icon';
import { addActive } from 'Utils';
import { useExperience } from 'components/data/jobs';
import { useMultipleReveal } from 'components/hooks/useAnimation';
import useLocalStorage from 'components/tools/hooks/useLocalStorage';
import HeroLine from 'components/tools/HeroLine';

const Experience = () => {
    useMultipleReveal(['#experiences h2', '.links-container', '.small-nav', '#jobs'], 200)

    const [storage, setStorage] = useLocalStorage('experiences', { type: 'web', id: 0 })

    const { webJobs, othersJobs } = useExperience()
    const [jobs, setJobs] = React.useState({
        type: storage ? storage.type : 'web',
        datas: storage ? (storage.type === 'web' ? webJobs : othersJobs) : webJobs,
        id: storage ? storage.id : 0
    })

    const [activeTabId, setActiveTabId] = React.useState(storage ? storage.id : 0)

    return (
        <Works id='experiences'>
            <HeroLine
                start={'about'}
                startAnchor={{ position: 'top', offset: { y: 0, x: 0 } }}
                end={'experiences-up__title'}
                endAnchor={{ position: 'top', offset: { y: -20, x: 0 } }}
            />
            <div className="experiences__container" data-name="Expériences">
                <p className='up__title' id="experiences-up__title">
                    Expériences
                </p>
                <RubberTitle
                    title="Un peu plus d'infos..."
                    className='section__title'
                    HTMLElement='h2'
                />
                <div className='links-container'>
                    <Link className="custom-link" to="/cv-alexandre-vurbier.pdf" target="_blank">Curriculum PDF</Link>
                    {' | '}
                    <Link className="custom-link" to="/curriculum">Curriculum HTML</Link>
                </div>
                <SmallNavbar>
                    <SmallNavButton className={addActive(jobs.type === 'web')}
                        onClick={() => {
                            setJobs({ type: 'web', datas: webJobs, id: 0 })
                            setStorage({ type: 'web', id: 0 })
                            setActiveTabId(0)
                        }}>
                        Web
                    </SmallNavButton>
                    <SmallNavButton className={addActive(jobs.type === 'others')}
                        onClick={() => {
                            setJobs({ type: 'others', datas: othersJobs, id: 0 })
                            setStorage({ type: 'others', id: 0 })
                            setActiveTabId(0)
                        }}>
                        Autres
                    </SmallNavButton>
                </SmallNavbar>
                <Editor id='jobs'>
                    <EditorTop role="tablist" aria-label="job-tabs">
                        {jobs.datas &&
                            jobs.datas.map(({ node }, i) => {
                                const { company, company2 } = node.frontmatter
                                return (
                                    <EditorTabButton
                                        key={i}
                                        id={`tab-${i}`}
                                        role="tab"
                                        tabIndex={activeTabId === i ? '0' : '-1'}
                                        aria-selected={activeTabId === i ? true : false}
                                        aria-controls={`panel-${i}`}
                                        isActive={activeTabId === i}
                                        onClick={() => {
                                            setActiveTabId(i)
                                            setStorage(prev => ({ ...prev, id: i }))
                                        }}
                                    >
                                        <Icon name="Code" />
                                        <span>{company}</span>
                                        {company2 &&
                                            <React.Fragment>
                                                <span>/{company2}</span>
                                            </React.Fragment>
                                        }
                                    </EditorTabButton>
                                )
                            })}
                        <EditorTabButton role="tab" tabIndex={'-1'}>
                            <Icon name="Typescript" />
                            <span>types.ts</span>
                        </EditorTabButton>
                        <EditorTabButton role="tab" tabIndex={'-1'}>
                            <Icon name="Reactjs" />
                            <span>index.tsx</span>
                        </EditorTabButton>
                        <EditorTabButton role="tab" tabIndex={'-1'}>
                            <Icon name="Javascript" />
                            <span>utils.js</span>
                        </EditorTabButton>
                    </EditorTop>

                    <EditorWindow>
                        <EditorWindowNumbers>
                            {[...new Array(60)].map((_, i) => {
                                return <div key={i}>{i + 1}</div>
                            })}
                        </EditorWindowNumbers>
                        {jobs.datas &&
                            jobs.datas.map(({ node }, i) => {
                                const { frontmatter, html } = node;
                                const { title, url, url2, company, company2, range } = frontmatter;
                                return (
                                    <EditorWindowInner
                                        key={i}
                                        id={`panel-${i}`}
                                        role="tabpanel"
                                        tabIndex={activeTabId === i ? '0' : '-1'}
                                        aria-labelledby={`tab-${i}`}
                                        aria-hidden={activeTabId !== i}
                                        hidden={activeTabId !== i}
                                    >
                                        <h3>{title}</h3>
                                        <a href={url} className="inline-link">{company}</a>
                                        {company2 &&
                                            <React.Fragment>
                                                <span> / </span>
                                                <a href={url2} className="inline-link">{company2}</a>
                                            </React.Fragment>
                                        }
                                        <p className="range">
                                            {'//'} {range}
                                        </p>
                                        <div dangerouslySetInnerHTML={{ __html: html }} />
                                    </EditorWindowInner>
                                )
                            })}
                    </EditorWindow>
                </Editor>
            </div>
        </Works>
    )
}

export default Experience;

const Works = styled.div`
    position : relative;
    width    : 100%;
    padding  : 150px 50px;
    z-index  : 3;

    .experiences__container {
        width     : 100%;
        max-width : 1200px;
        margin    : 0 auto;

        &:before {
            content        : attr(data-name);
            position       : absolute;
            left           : 50%;
            bottom         : -50px;
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
    }

    .links-container {
        margin-bottom : 20px;
        color         : var(--text-secondary);
        .custom-link {
            &:nth-child(1) {
                margin-right : 5px;
            }
            &:nth-child(2) {
                margin-left : 5px;
            }
        }
    }

    &:after {
        content    : '';
        position   : absolute;
        width      : 100%;
        height     : 100%;
        top        : 0;
        right      : 0;
        background : linear-gradient(to bottom, var(--body) 30%, rgba(var(--body-rgb), 0) 100%);
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

    @media(max-width:768px) {
        padding : 100px 15px;
    }
`;

const Editor = styled.div`
    position      : relative;
    background    : var(--editor-panel);
    box-shadow    : var(--shadow-two);
    margin        : 20px auto 0;
    border-radius : var(--rounded-lg);
    border        : 1px solid var(--editor-border);
    overflow      : hidden;
`;

const EditorTop = styled.div`
    position      : relative;
    display       : flex;
    padding       : 8px 8px 0;
    border-bottom : 1px solid var(--editor-border);

    @media(max-width: 560px) {
        border-bottom : 0;
        overflow-x    : auto;

        &::-webkit-scrollbar {
            width  : 0;
            height : 7px;
        }
        &::-webkit-scrollbar-thumb {
            background      : var(--editor-border);
            border          : 2px solid var(--editor-window);
            background-clip : padding-box;
        }
        &::-webkit-scrollbar-track {
            background      : var(--editor-window);
            border          : 0px solid var(--editor-window);
            border-top      : 1px solid var(--editor-border);
            background-clip : padding-box;
        }
        &::-webkit-scrollbar-corner {
            background : transparent;
        }
    }
`;

const EditorTabButton = styled.button`
    display          : flex;
    align-items      : center;
    justify-content  : center;
    width            : auto;
    padding          : 8px 16px;
    margin-bottom    : ${({ isActive }) => (isActive ? '-2px' : '0')};
    border           : ${({ isActive }) => (isActive ? '1px solid var(--editor-border)' : 'none')};
    border-radius    : 6px 6px 0 0;
    background-color : ${({ isActive }) => (isActive ? 'var(--editor-window)' : 'var(--editor-panel)')};
    color            : ${({ isActive }) => (isActive ? 'var(--editor-active-color)' : 'var(--editor-inactive-color)')};
    font-family      : var(--font-fam1);
    line-height      : 16px;
    cursor           : pointer;

    span {
        padding-top : 1px;
        white-space : nowrap;
    }

    svg {
        height       : 16px;
        width        : 16px;
        margin-right : 8px;
    }

    &:hover,
    &:focus {
        color : var(--editor-active-color);
    }
`;

const EditorWindow = styled.div`
    position         : relative;
    width            : 100%;
    padding          : 16px 16px 24px 54px;
    background-color : var(--editor-window);
    border-radius    : 0 0 var(--rounded-lg) var(--rounded-lg);
    font-family      : var(--editor-font-fam);
    display          : flex;
    overflow         : hidden;
`;

const EditorWindowNumbers = styled.div`
    display        : flex;
    flex-direction : column;
    position       : absolute;
    left           : 16px;

    div {
        height         : 24px;
        padding-right  : 14px;
        padding-top    : 2px;
        padding-bottom : 6px;
        font-size      : 16px;
        text-align     : right;
        color          : var(--editor-nb);
    }
`

const EditorWindowInner = styled.div`
    width        : 100%;
    height       : auto;

    h3,
    h4,
    a,
    p,
    li {
        line-height    : 24px;
    }

    h3 {
        font-size     : var(--font-2xl);
        font-weight   : 600;
        margin-bottom : 24px;
    }

    .inline-link {
        color       : var(--editor-const);
        font-size   : var(--font-lg);
    }

    .range {
        /* margin-bottom : 24px; */
        color         : var(--editor-nb);
        font-size     : var(--font-sm);
        font-style    : italic;
    }

    h4 {
        font-size      : 16px;
        margin-top     : 24px;
        margin-bottom  : 0;
        color          : var(--editor-function);
    }

    li {
        position       : relative;
        padding-left   : 20px;
        font-size      : 16px;
        color          : var(--editor-value);

        &:before {
            content  : "-";
            position : absolute;
            left     : 0px;
            color    : var(--editor-nb);
        }
    }
`;