import React from 'react';
import styled from 'styled-components';
import Icon from '../icons/Icon';
import { addActive } from '../../../Utils';
import { ThemeContext } from './ThemeContextWrapper';
import { useClickOutside } from '../hooks/useClickOutside';

const ThemeToggle = () => {
    const { theme, handleTheme } = React.useContext(ThemeContext)
    const menuRef = React.useRef()
    const [open, setOpen] = React.useState(false)
    useClickOutside(menuRef, () => setOpen(false))

    const changeTheme = (choice) => {
        handleTheme(choice)
        setOpen(false)
    }

    const defaultThemes = [
        { type: 'light', name: 'Clair', icon: 'Sun' },
        { type: 'dark', name: 'Sombre', icon: 'Moon' },
        { type: 'prefers-color-scheme', name: 'Système', icon: 'Computer' }
    ]

    const colorThemes = [
        { type: 'orange', name: 'Mandarin' },
        { type: 'yellow', name: 'Forsythia' },
        { type: 'green', name: 'Olive' },
        { type: 'navy', name: 'Neon' },
        { type: 'purple', name: 'Lavander' },
        { type: 'pink', name: 'Bellarosa' },
        { type: 'red', name: 'Evil' }
    ]

    return (
        <ThemeMenu>
            <ThemeContainer ref={menuRef}>
                <Toggle aria-label="Theme-toggle" onClick={() => setOpen(!open)} className={`theme__toggle ${addActive(open)}`}>
                    {theme?.theme === 'dark' ? <Icon name="Moon" /> : <Icon name="Sun" />}
                </Toggle>
                {open &&
                    <div className='theme-menu'>
                        <div className="__title">
                            Thème
                        </div>
                        {defaultThemes.map(({ type, name, icon }, i) => {
                            return (
                                <div key={i}
                                    role='button'
                                    tabIndex="0"
                                    className={`theme-choice ${addActive(theme.preference === type)}`}
                                    onClick={() => changeTheme(type)}
                                    onKeyDown={() => changeTheme(type)}
                                >
                                    <Icon name={icon} /> <span>{name}</span>
                                </div>
                            )
                        })}
                        {colorThemes.map(({ type, name }, i) => {
                            return (
                                <div key={i}
                                    role='button'
                                    tabIndex="0"
                                    className={`theme-choice ${addActive(theme.preference === type)}`}
                                    onClick={() => changeTheme(type)}
                                    onKeyDown={() => changeTheme(type)}
                                >
                                    <div className={`square ${type}`}></div> <span>{name}</span>
                                </div>
                            )
                        })}
                    </div>
                }
            </ThemeContainer>
        </ThemeMenu>
    )
}

export default React.memo(ThemeToggle)

const ThemeMenu = styled.div`
    z-index  : 1000;

    @media(max-width: 768px) {
        top   : 0;
        right : 40px;
    }

    .square {
        position      : relative;
        height        : 22px;
        width         : 22px;
        margin-right  : 9px;
        border-radius : var(--rounded-full);
        overflow      : hidden;
        &:before {
            content   : '';
            position  : absolute;
            left      : 0;
            top       : 0;
            bottom    : 0;
            right     : 0;
            height    : 22px;
            width     : 22px;
            clip-path: polygon(100% 0, 100% 100%, 50% 100%, 50% 0);
        }
        &.purple {
            background-color : #040b27;
            border           : 1px solid #626ed4;
            &:before {
                background-color : #626ed4;
            }
        }
        &.orange {
            background-color : #212528;
            border           : 1px solid #f88e3a;
            &:before {
                background-color : #f88e3a;
            }
        }
        &.green {
            background-color : #122333;
            border           : 1px solid #2eac68;
            &:before {
                background-color : #2eac68;
            }
        }
        &.navy {
            background-color : #0a192f;
            border           : 1px solid #64ffda;
            &:before {
                background-color : #64ffda;
            }
        }
        &.yellow {
            background-color : #242b35;
            border           : 1px solid #fbd566;
            &:before {
                background-color : #fbd566;
            }
        }
        &.pink {
            background-color : #150E15;
            border           : 1px solid #D25E96;
            &:before {
                background-color : #D25E96;
            }
        }
        &.red {
            background-color : #270505;
            border           : 1px solid #f62528;
            &:before {
                background-color : #f62528;
            }
        }
    }
`

const ThemeContainer = styled.div`
    position : relative;
        
    .__title {
        width       : 100%;
        padding     : 5px 12px;
        font-size   : 14px;
        font-weight : 700;
    }

    .theme-menu {
        position      : absolute;
        top           : 110%;
        right         : 0;
        width         : 200px;
        padding       : 5px 0;
        background    : var(--body-light);
        border-radius : var(--rounded-sm);
        box-shadow    : var(--shadow-two), var(--shadow-relief);

        .theme-choice {
            display     : flex;
            align-items : center;
            height      : 36px;
            padding     : 0 8px;
            cursor      : pointer;
            font-weight : 500;
            color       : var(--text);

            span {
                line-height : 14px;
                margin-top  : 2px;
            }

            &:hover,
            &.active {
                background : rgba(var(--primary-rgb), 0.1);
                svg {
                    color : var(--primary);
                }
            }

            svg {
                height       : 22px;
                width        : 22px;
                margin-right : 8px;
                color        : var(--slate);
            }
        }
    }
`

const Toggle = styled.button`
    display         : flex;
    align-items     : center;
    justify-content : center;
    height          : 36px;
    width           : 36px;
    margin-left     : 5px;
    border-radius   : var(--rounded-md);
    cursor          : pointer;

    svg {
        width  : 22px;
        height : 22px;
        color  : var(--primary);
    }

    &:hover,
    &.active {
        background-color : rgba(var(--primary-rgb), 0.1);
    }

    @media(max-width: 768px) {
        height        : 44px;
        width         : 40px;
        border-radius : 0;
        box-shadow    : none;
    }
`