import React from "react";
import { Link } from "gatsby";
import styled, { css } from "styled-components";
import { defaultButton } from "./Button";
import Ripple from "./Ripple";
import Icon from "components/tools/icons/Icon";

export const OutlinedButton = (props) => {
    const { onClick, className, disabled, type } = props
    return (
        <OutlinedBtn className={className} disabled={disabled} type={type} onClick={onClick}>
            {props.children} <Ripple />
        </OutlinedBtn>
    )
}

export const OutlinedLinkButton = (props) => {
    const { onClick, className, id, disabled, type, to } = props
    return (
        <OutlinedBtn isLink id={id} className={className} disabled={disabled} type={type} onClick={onClick}>
            <Link to={to}>
                {props.children}
                <Icon name="Arrow" />
                <Ripple />
            </Link>
        </OutlinedBtn>
    )
}

const OutlinedBtn = styled(defaultButton)`
    position         : relative;
    border           : 1px solid var(--primary);
    color            : var(--primary);
    border-radius    : var(--rounded-sm);
    background-color : transparent;
    box-shadow       : none;
    ${props => props.isLink && css`padding : 0`};
    transition : .2s;

    a {
        position : relative;
        color    : var(--primary);
        display  : block;
        ${props => props.isLink && css`padding : 15px 50px`};
        transition  : .2s;
    }

    svg {
        height      : 8px;
        width       : auto;
        stroke      : var(--primary);
        fill        : var(--primary);
        margin-left : 10px;
        transition  : .2s;
    }

    &:hover {
        background : rgba(var(--primary-rgb), 0.1);
        box-shadow : 0 0 7px 0 rgba(var(--primary-rgb), 0.5) inset, 0 0 7px 3px rgba(var(--primary-rgb), 0.5);
        transition : .2s ease-in-out;
    }
`;