import React from 'react'
import { Link } from 'gatsby';
import styled from 'styled-components';
import { navlinks, socials } from '__config';
import Icon from './tools/icons/Icon';
import Logo from './tools/Logo';

const Footer = () => {
    return (
        <FooterContainer id="footer">
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-4 col-lg-4">
                        <div className="footer__logo">
                            <Logo />
                        </div>
                        <div className='socials__container'>
                            {socials &&
                                socials.map(({ url, name }, i) => (
                                    <div key={i}>
                                        <a href={url} aria-label={name} target="_blank" rel="noreferrer">
                                            <Icon name={name} />
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-4 col-lg-4">
                        <div className="__footer-title">Plan du site</div>
                        <ul>
                            {navlinks.map((tab, key) => {
                                return (
                                    !tab.subtabs ? (
                                        <li key={key}>
                                            <Link to={tab.url}>{tab.name}</Link>
                                        </li>
                                    ) : (
                                        <ul key={key}>
                                            {tab.subtabs.map((el, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Link to={el.url}>{el.name}</Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )
                                )
                            })}
                        </ul>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-4 col-lg-4">
                        <div className="__footer-title">Légales</div>
                        <Link to="/politique-cookies">Politique de cookies</Link>
                        <a href="#cookies-manager">Gérer mes cookies</a>
                    </div>
                </div>

                <div className="footer__bottom">
                    Copyright © 2022 Alexandre&nbsp;Vurbier
                </div>
            </div>
        </FooterContainer>
    )
}

export default React.memo(Footer);

const FooterContainer = styled.section`
    position   : absolute;
    bottom     : 0;
    width      : 100%;
    padding    : 50px;
    background : rgba(var(--footer-rgb), 1);
    border-top : 1px solid var(--light-border);
    box-shadow : var(--shadow-top);

    .container {
        position  : relative;
        max-width : 1200px;
        width     : 85%;

        .footer__logo {
            .logo {
                width  : 80px;
                height : 80px;
                fill   : var(--primary);
            }
        }
        .socials__container {
            display    : flex;
            margin-top : 20px;
            svg {
                width   : 44px;
                height  : 44px;
                padding : 10px;
                &:hover {
                    stroke : var(--primary);
                }
            }

            @media(max-width:768px) {
                justify-content : center;
            }
        }

        a {
            display     : block;
            padding     : 6px 0;
            font-family : var(--font-fam2);
            &:hover {
                color : var(--primary);
            }
        }
    
        .__footer-title {
            font-weight   : 600;
            font-size     : 16px;
            color         : var(--text-secondary);
            margin-bottom : 10px;
        }
    }

    .footer__bottom {
        width       : 100%;
        padding-top : 30px;
        margin-top  : 45px;
        border-top  : 1px solid rgba(var(--primary-rgb), 0.1);
        font-family : var(--font-fam2);
        font-size   : 14px;
        text-align  : right;
    }

    &:after {
        content    : '';
        position   : absolute;
        width      : 100%;
        height     : 100%;
        bottom        : 0;
        right      : 0;
        background : linear-gradient(to top, var(--body) 10%, rgba(var(--body-rgb), 0) 100%);
        z-index    : -1;
    }

    &:before {
        content    : '';
        position   : absolute;
        width      : 20%;
        height     : 100%;
        bottom     : 0;
        left      : 0;
        background : linear-gradient(to right, var(--body) 30%, rgba(var(--body-rgb), 0) 100%);
        z-index    : -1;
    }

    @media(max-width:768px) {
        padding    : 50px 0;
        text-align : center;
        .col {
            padding : 20px 0;
        }
        .footer__logo {
            .logo {
                width  : 100px;
                height : 100px;
            }
        }
        .socials__container {
            justify-content : center;
        }
    }
`;