import React from 'react'
import PropTypes from "prop-types"
import styled from 'styled-components'

export const SmallNavbar = ({ children }) => {
    return (
        <SmallNav className="small-nav">
            {children}
        </SmallNav>
    )
}

SmallNavbar.propTypes = {
    children: PropTypes.node.isRequired,
}

const SmallNav = styled.div`
    position : relative;
    display  : inline-flex;
`

export const SmallNavButton = ({ children, onClick, className }) => {
    return (
        <SmallNavBtn className={className} onClick={onClick}>
            <span></span>{children}
        </SmallNavBtn>
    )
}

const SmallNavBtn = styled.button`
    position         : relative;
    min-width        : 170px;
    text-align       : center;
    font-size        : var(--font-md);
    color            : var(--primary);
    font-family      : var(--font-fam2);
    font-weight      : 500;
    padding          : 10px 20px;
    background-color : rgba(var(--primary-rgb), 0.05);
    border           : 1px solid transparent;
    z-index          : 2;
    overflow         : hidden;

    &.active {
        color            : var(--primary);
        background-color : rgba(var(--primary-rgb), 0.12);
        border           : 1px solid var(--primary);
        &:before,
        &:after {
            content : none;
        }
        span {
            &:before,
            &:after {
                content : none;
            }
        }
    }

    &::before,
    &::after {
        content    : '';
        position   : absolute;
        width      : 8px;
        height     : 8px;
        background : transparent;
        transition : .2s;
    }

    &::before {
        top         : 0px;
        left        : 0px;
        border-top  : 1px solid var(--primary);
        border-left : 1px solid var(--primary);
    }
    &::after {
        top          : 0px;
        right        : 0px;
        border-top   : 1px solid var(--primary);
        border-right : 1px solid var(--primary);
    }

    span {
        &::before,
        &::after {
            content    : '';
            position   : absolute;
            width      : 8px;
            height     : 8px;
            background : transparent;
            transition : .2s;
        }
        &::after {
            bottom        : 0px;
            right         : 0px;
            border-bottom : 1px solid var(--primary);
            border-right  : 1px solid var(--primary);
        }
        &::before {
            bottom        : 0px;
            left          : 0px;
            border-bottom : 1px solid var(--primary);
            border-left   : 1px solid var(--primary);
        }
    }

    &:hover {
        background-color : rgba(var(--primary-rgb), 0.12);
        &::before,
        &::after {
            width  : calc( 180px / 2);
            height : calc( 50px / 2);
        }
        span {
            &::before,
            &::after  {
                width  : calc( 180px / 2);
                height : calc( 50px / 2);
            }
        }
    }

    @media(max-width: 576px) {
        min-width : 150px;
        padding   : 10px;
    }

    span {
        font-size : 13px;
    }

    &:first-child {
        margin-right : 5px;
    }
    &:last-child {
        margin-left : 5px;
    }
`