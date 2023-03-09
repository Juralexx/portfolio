import React from 'react';
import styled from 'styled-components';
import Head from 'Head';
import Root from 'Root';
import Main from 'components/Main';
import Breadcrumbs from 'components/tools/Breadcrumb';
import AsyncImg from 'components/tools/AsyncImg';
import { useExperience } from 'components/data/jobs';
import { useSiteDatas } from 'components/data/site';
import { useSchools } from 'components/data/schools';
import { about, birth, city, job, languages, lastname, name, phone, email, skills, website, programming, librairies, devtools, design } from '__config';

const CurriculumPage = ({ location }) => {
    const siteDatas = useSiteDatas()
    const { webJobs, othersJobs } = useExperience()
    const schools = useSchools()

    return (
        <Root location={location}>
            <Head title='Curriculum Vitae' />
            <Main>
                <CurriculumContainer className='container-lg'>
                    <h1>Curriculum</h1>
                    <Breadcrumbs denomination={siteDatas.author} description="Curriculum" />

                    <Curriculum className='__curriculum'>
                        <CurriculumHeader>
                            <div className='img__container'>
                                <AsyncImg src='/alexandre-vurbier-cv.jpg' alt={name + ' - ' + job} />
                            </div>
                            <div className='name__container'>
                                <div className='__name'>
                                    <span>{name}</span>
                                    <span>{lastname}</span>
                                </div>
                                <div className='__job'>{job}</div>
                                <p className='__about'>{about}</p>
                            </div>
                        </CurriculumHeader>
                        <CurriculumBody>
                            <div className='__informations'>
                                <div className='__flex-content'>
                                    <div>
                                        <h4>Date de naissance</h4>
                                        <p>{birth}</p>
                                    </div>
                                    <div>
                                        <h4>Adresse</h4>
                                        <p>{city}</p>
                                    </div>
                                </div>
                                <div className='__flex-content'>
                                    <div>
                                        <h4>Téléphone</h4>
                                        <p>{phone}</p>
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>{email}</p>
                                    </div>
                                </div>
                                <h4>Portfolio</h4>
                                <p>{website}</p>
                                <div className='__flex-content'>
                                    <div>
                                        <h4>Compétences</h4>
                                        <ul>
                                            {skills.map((skill, key) => {
                                                return <li key={key}>{skill}</li>
                                            })}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4>Langues</h4>
                                        <ul>
                                            {languages.map((language, key) => {
                                                return <li key={key}>{language}</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className='__flex-content'>
                                    <div>
                                        <h4>Programmation</h4>
                                        <ul>
                                            {programming.map((language, key) => {
                                                return <li key={key}>{language}</li>
                                            })}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4>Librairies & Frameworks</h4>
                                        <ul className='__flex-ul'>
                                            {librairies.map((library, key) => {
                                                return <li key={key}>{library}</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className='__flex-content'>
                                    <div>
                                        <h4>Outils</h4>
                                        <ul>
                                            {devtools.map((tool, key) => {
                                                return <li key={key}>{tool}</li>
                                            })}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4>Design</h4>
                                        <ul>
                                            {design.map((tool, key) => {
                                                return <li key={key}>{tool}</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='__details'>
                                <div>
                                    <h2>Expériences</h2>
                                    {webJobs &&
                                        webJobs.map(({ node }, i) => {
                                            const { frontmatter, html } = node;
                                            const { title, url, company, url2, company2, range } = frontmatter;
                                            return (
                                                <div className='details__card' key={i}>
                                                    <h3>{title}</h3>
                                                    <p className='__company'>
                                                        <a href={url} target="_blank" rel='noreferrer'>{company}</a>
                                                        {company2 &&
                                                            <React.Fragment>
                                                                <> | </>
                                                                <a href={url2} target="_blank" rel='noreferrer'>{company2}</a>
                                                            </React.Fragment>
                                                        }
                                                        <span>| {range}</span>
                                                    </p>
                                                    <p dangerouslySetInnerHTML={{ __html: html }}></p>
                                                </div>
                                            )
                                        })
                                    }
                                    {othersJobs &&
                                        othersJobs.map(({ node }, i) => {
                                            const { frontmatter, html } = node;
                                            const { title, url, company, range } = frontmatter;
                                            return (
                                                <div className='details__card' key={i}>
                                                    <h3>{title}</h3>
                                                    <p className='__company'>
                                                        <a href={url} target="_blank" rel='noreferrer'>{company}</a>
                                                        <span>| {range}</span>
                                                    </p>
                                                    <p dangerouslySetInnerHTML={{ __html: html }}></p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <h2>Formations</h2>
                                    {schools &&
                                        schools.map((el, i) => {
                                            const { formation, school, location, range } = el.node.frontmatter;
                                            return (
                                                <div className='details__card' key={i}>
                                                    <h3>{school} - <span>{location}</span></h3>
                                                    <p className='__company'>{formation}</p>
                                                    <p className='__company'><span>{range}</span></p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </CurriculumBody>
                    </Curriculum>
                </CurriculumContainer>
            </Main>
        </Root>
    )
}

export default CurriculumPage

const CurriculumContainer = styled.main`

    h1 {
        margin-bottom : 7px;
    }

    h2 {
        margin         : 60px 0 10px;
        color          : var(--text-secondary);
        text-transform : uppercase;
        font-size      : 24px;
        font-weight    : 500;
        letter-spacing : 1.5px;
        font-family    : var(--font-fam2);
        color          : var(--primary);
    }

    h4 {
        margin      : 13px 0 5px;
        font-family : var(--font-fam1);
        font-weight : 500;
        font-size   : 18px;
        color       : var(--primary);
    }

    ul {
        margin : 5px;
        li {
            position     : relative;
            padding-left : 20px;
            line-height  : 24px;
            font-size    : 16px;
            font-weight  : 400;

            &:before {
                content  : "▹";
                position : absolute;
                left     : 0px;
                color    : var(--primary);
            }
        }
    }

    .__flex-ul {
        column-count : 2;
    }

    .__about {
        padding : 10px 0 0;
    }
`
/**
 * 
 */

const Curriculum = styled.div`
    box-shadow : var(--shadow-relief), var(--shadow-tiny);
    background : var(--body-light);
    overflow   : hidden;
`

/**
 * 
 */

const CurriculumHeader = styled.div`
    position : relative;
    height   : auto;
    width    : 100%;
    display  : flex;
    z-index  : 2;

    &:before {
        content    : '';
        position   : absolute;
        right       : 65px;
        top        : -40px;
        width      : 70px;
        height     : 80px;
        background : var(--body);
        clip-path  : polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%);
    }

    &:after {
        content    : '';
        position   : absolute;
        right      : -10px;
        top        : -25px;
        width      : 100px;
        height     : 115px;
        background : rgba(var(--primary-rgb), 0.6);
        z-index    : -1;
        clip-path  : polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%);
    }

    .img__container {
        position         : relative;
        width            : 35%;
        display          : flex;
        justify-content  : flex-end;
        padding          : 20px 0 0px 30px;
        background-color : var(--body);

        /* &:before {
            content    : '';
            position   : absolute;
            right      : 0px;
            bottom     : -60px;
            width      : 130%;
            height     : 160%;
            background : var(--body-light);
            clip-path  : polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%);
            z-index    : -2;
        } */

        &:after {
            content    : '';
            position   : absolute;
            left      : -15%;
            bottom     : 10px;
            width      : 100%;
            height     : 310px;
            background : rgba(var(--primary-rgb), 0.6);
            clip-path  : polygon(0 0, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%);
            z-index    : -1;
        }

        img {
            position      : relative;
            border-radius : var(--rounded-sm);
            filter        : grayscale(100%) contrast(1);
            width         : 200px;
            min-width     : 200px;
            height        : 222px;
            min-height    : 222px;
            margin-right  : 20px;
            clip-path     : polygon(50% 0, 100% 22%, 100% 78%, 50% 100%, 0 78%, 0 22%);
        }
    }

    .name__container {
        display         : flex;
        flex-direction  : column;
        justify-content : center;
        padding         : 20px 30px 0 30px;
        width           : 65%;

        .__name {
            font-size   : 40px;
            line-height : 45px;
            font-weight : 600;
            
            span {
                display : block;
                &:nth-child(2) {
                    font-size      : 42px;
                    text-transform : uppercase;
                }
            }
        }

        .__job {
            color          : var(--primary);
            font-size      : 24px;
            font-weight    : 500;
            font-family    : var(--font-fam2);
            letter-spacing : 0px;
            text-transform : uppercase;
            margin-top     : 10px;
        }
    }
    @media(max-width: 992px) {
        .name__container {
            width : 100%;
            .name {
                span {
                    font-size   : 28px;
                    line-height : 32px;
                    &:nth-child(2) {
                        font-size   : 40px;
                        line-height : 44px;
                    }
                }
            }
            .job {
                font-size : 22px;
            }
        }

        .img__container {
            display : none;
            background-color : var(--body-light);
            &:before {
                content : none;
            }
            &:after {
                height : 100%;
                width  : 100%;
                bottom : 70px;
            }
        }
    }
    @media(max-width:576px) {
        flex-direction : column;
        
        .name__container {
            width   : 100%;
            padding : 20px 15px 0;
        }

        .img__container {
            width           : 80%;
            justify-content : flex-start;
            img {
                max-width : 60%;
            }
            &:after {
                bottom    : 40px;
                height    : 100%;
                width     : 80%;
                right     : 45%;
            }
        }
    }
`

/**
 * 
 */

const CurriculumBody = styled.div`
    position  : relative;
    display   : flex;

    .__informations {
        width      : 35%;
        padding    : 30px 30px 40px;
        background : var(--body);
        min-height : 100%;

        > div {
            width : 100%;
        }

        h4 {
            width : 100%;
        }

        p {
            text-align : justify;
        }

        @media(max-width: 992px) {
            position : relative;
            width    : 100%;
            padding  : 120px 15px 40px;
            &:after {
                content    : '';
                position   : absolute;
                right      : 0;
                bottom     : -100px;
                width      : 150%;
                height     : 400px;
                background : var(--body);
                clip-path  : polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%);
                z-index    : -1;
            }
        }

        .__flex-content {
            display        : flex;
            flex-direction : column;

            @media(min-width: 577px) and (max-width: 992px) {
                flex-direction : row;
                > div {
                    width : 50%;
                }
            }
        }
    }

    .__details {
        width   : 65%;
        padding : 30px 30px 50px;

        h2 {
            margin         : 0 0 25px;
            color          : var(--primary);
            font-size      : 30px;
            letter-spacing : 3px;
        }
        > div {
            &:nth-child(2) {
                h2 {
                    margin-top : 60px;
                }
            }
        }
    }

    .details__card {
        position   : relative;
        padding    : 0 0 10px 30px;
        margin-top : 10px;

        &:last-child {
            padding-bottom : 0;
        }

        &:after {
            content    : '';
            position   : absolute;
            left       : 0;
            top        : 30px;
            width      : 2px;
            height     : calc(100% - 30px);
            background : var(--light-border);
            z-index    : -1;
        }
        
        &:before {
            content    : '';
            position   : absolute;
            left       : -5px;
            top        : 5px;
            width      : 12px;
            height     : 13px;
            background : var(--primary);
            clip-path  : polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%);
        }

        h3 {
            margin-bottom : 5px;
            color         : var(--text);
            span {
                color       : var(--text);
                font-weight : 400;
            }
        }
        h4 {
            margin-top    : 10px;
            margin-bottom : 0;
            color         : var(--text);
        }
        .__company {
            color       : var(--text);
            font-weight : 500;
            a {
                font-size    : 18px;
            }
            span {
                margin-left : 8px;
                font-style  : italic;
                color       : var(--text-secondary);
                font-weight : 400;
            }
        }
    }

    @media(max-width: 992px) {
        flex-direction : column;

        &:before {
            content    : '';
            position   : absolute;
            right      : 0;
            top        : -300px;
            width      : 150%;
            height     : 400px;
            background : var(--body-light);
            clip-path  : polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%);
            z-index    : 2;
        }

        .__details {
            width   : 100%;
            padding : 150px 15px 50px;
            h2 {
                font-size : 23px;
            }
        }
        .details__card {
            h3 {
                font-size : 20px;
            }
            .__company {
                word-wrap: pre-line;
            }
        }
    }
`