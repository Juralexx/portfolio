import React from "react";
import styled from "styled-components";
import { defaultButton } from "./Button";

const TextBtn = styled(defaultButton)`
    color         : var(--primary);
    border-radius : var(--radius);
    box-shadow    : none;

    &:hover {
        background : rgba(var(--primary-rgb), 0.15);
    }
`;

export const TextButton = (props) => {
    const { onClick, className, disabled } = props
    return (
        <TextBtn onClick={onClick} className={className} disabled={disabled}>
            {props.children}
        </TextBtn>
    )
}