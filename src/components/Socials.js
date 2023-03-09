import React from 'react';
import styled from 'styled-components';
import Icon from "./tools/icons/Icon";
import { socials } from '__config';
import { useReveal } from './hooks/useAnimation';
import { FormContext } from './contexts/FormContext';

const Socials = () => {
    useReveal('.social__list', 2600)
    useReveal('.contact__link', 2700)
    const { setOpenForm } = React.useContext(FormContext)

    return (
        <>
            <SocialList className='social__list'>
                {socials &&
                    socials.map(({ url, name }, i) => (
                        <div key={i}>
                            <a href={url} aria-label={name} target="_blank" rel="noreferrer">
                                <Icon name={name} />
                            </a>
                        </div>
                    ))
                }
            </SocialList>
            <LinkWrapper className='contact__link'>
                <div
                    role="button"
                    aria-label="contact"
                    tabIndex={0}
                    onClick={() => setOpenForm(true)}
                    onKeyDown={() => setOpenForm(true)}
                >
                    <span>Me contacter <Icon name='Arrow' /></span>
                    <Icon name='Envelope' />
                </div>
            </LinkWrapper>
        </>
    )
}

export default React.memo(Socials);

const SocialList = styled.div`
    position       : fixed;
    left           : 20px;
    bottom         : 0;
    display        : flex;
    flex-direction : column;
    align-items    : center;
    margin         : 0;
    padding        : 0;
    list-style     : none;
    z-index        : 1000;

    &:after {
        content          : '';
        display          : block;
        width            : 1px;
        height           : 90px;
        margin           : 0 auto;
        background-color : var(--primary);
    }

    div {
        width         : 40px;
        height        : 40px;
        padding       : 10px;
        margin-bottom : 10px;
        transition    : .2s ease;

        &:last-of-type {
            margin-bottom : 20px;
        }

        a {

            svg {
                width  : 20px;
                height : 20px;
                color  : var(--primary);
            }
        }

        &:hover, &:focus {
            transform  : translateY(-4px);
            transition : .2s ease;

            svg {
                color : var(--primary);
            }
        }
    }

    @media(max-width:992px) {
        display : none;
    }
`;

const LinkWrapper = styled.div`
    position       : fixed;
    right          : 20px;
    bottom         : 0;
    display        : flex;
    flex-direction : column;
    align-items    : center;
    z-index        : 1000;

    &:after {
        content          : '';
        display          : block;
        width            : 1px;
        height           : 90px;
        margin           : 0 auto;
        background-color : var(--primary);
    }

    div {
        margin         : 20px auto;
        padding        : 10px;
        font-family    : var(--font-fam1);
        font-size      : var(--font-sm);
        line-height    : 16px;
        letter-spacing : 0.1em;
        writing-mode   : vertical-rl;
        transition     : .2s ease;
        cursor         : pointer;

        svg {
            width  : 20px;
            height : 20px;
            color  : var(--primary);
        }

        span {
            position      : relative;
            visibility    : hidden;
            opacity       : 0;
            margin-bottom : 30px;
            transition    : .2s ease;
            svg {
                transform  : rotate(90deg) scaleX(1.3);
                stroke     : var(--primary);
                margin-top : 15px;
                transition : .4s ease;
            }
        }

        &:hover,
        &:focus {
            transform  : translateY(-4px);
            transition : .2s ease;
            color      : var(--primary);

            span {
                visibility    : visible;
                opacity       : 1;
                color         : var(--primary);
                margin-bottom : 20px;
                transition    : .2s ease;
            }
        }
    }

    @media(max-width:992px) {
        display : none;
    }
`;