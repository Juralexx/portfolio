import styled from 'styled-components';

export const defaultButton = styled.button`
    position        : relative;
    display         : flex;
    align-items     : center;
    justify-content : center;
    padding         : 15px 50px;
    font-size       : 16px;
    font-family     : var(--font-fam2);
    text-align      : center;
    text-decoration : none;
    text-transform  : none;
    border          : none;
    outline         : none;
    white-space     : nowrap;
    transform       : scale(1);
    overflow        : hidden;
    box-shadow      : var(--shadow-tiny);
    transition      : .2s ease-in-out;

    &:disabled {
        opacity : 0.5;
    }

    &:active {
        transform  : scale(0.95);
        box-shadow : inset var(--shadow-tiny);
    }

    &.delete {
        background-color : rgba(var(--red-rgb), 0.9);
        &:hover {
            background-color : var(--red);
        }
    }

    &.validate {
        background-color : rgba(var(--green-rgb), 0.9);
        &:hover {
            background-color : var(--green);
        }
    }

    &.light_delete {
        color : var(--red);
        svg {
            color : var(--red);
        }
        &:hover {
            background-color : rgba(var(--red-rgb), 0.2);
        }
    }

    &.light_validate {
        color : var(--green);
        svg {
            color : var(--green);
        }
        &:hover {
            background-color : rgba(var(--green-rgb), 0.2);
        }
    }
`;