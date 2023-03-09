import React from "react";
import styled from "styled-components";
import { defaultButton } from "./Button";

const ButtonPrimary = styled(defaultButton)`
    color         : white !important;
    background    : var(--primary);
    border-radius : var(--radius);

    &:hover {
        background : var(--primary-dark);
    }

    &.half {
        width : 50%;
    }
`;

export const Button = (props) => {
    const { onClick, className, disabled, onKeyDown, style } = props
    return (
        <ButtonPrimary onClick={onClick} className={className} disabled={disabled} onKeyDown={onKeyDown} style={style}>
            {props.children}
        </ButtonPrimary>
    )
}