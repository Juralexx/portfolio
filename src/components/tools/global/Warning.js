import React from 'react'
import styled from 'styled-components'
import Icon from '../icons/Icon'

const Warning = (props) => {
    const { open, setOpen, css, title, text, onClose } = props
    const wrapperClass = open ? "modal_wrapper" : "modal_wrapper hide_wrapper"
    const containerClass = open ? `warning_container warning_modal warning_container-active show_modal ${css ? css : null}` : 'warning_container warning_modal hide_modal'

    const close = () => {
        if (onClose) onClose()
        if (setOpen) setOpen()
    }

    return (
        <WarningWrapper className={wrapperClass}>
            <div className={containerClass}>
                <button aria-label="close" className="close_modal" onClick={close}>
                    <Icon name="Cross" />
                </button>
                <div className="warning_title">{title}</div>
                <div className="warning_text">{text}</div>
                {props.children}
            </div>
        </WarningWrapper>
    )
}

export default Warning

const WarningWrapper = styled.div`
    position        : fixed;
    top             : 0;
    right           : 0;
    bottom          : 0;
    left            : 0;
    overflow-x      : hidden;
    overflow-y      : auto;
    visibility      : visible;
    z-index         : 100000000000;
    display         : flex;
    align-items     : center;
    backdrop-filter : blur(5px);

    &.hide_wrapper {
        visibility : hidden;
    }

    .warning_container {
        margin           : auto;
        max-width        : 400px;
        padding          : 35px 25px;
        color            : var(--text);
        background-color : var(--body);
        border-radius    : var(--rounded-sm);
        box-shadow       : var(--shadow-relief), var(--shadow-two);
        z-index          : 100000000000;

        @media(max-width: 768px) {
            width : 85%;
        }

        .warning_title {
            font-size   : 20px;
            font-weight : 700;
            width       : 90%;
            color       : var(--red);
        }

        .warning_text {
            padding : 20px 0;
            color   : var(--text);
        }
    
        &.hide_modal {
            opacity    : 0;
            visibility : hidden;
            transform  : scale(0.8);
            transition : visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
        }
    
        &.show_modal {
            opacity    : 1;
            visibility : visible;
            transform  : scale(1);
            transition : visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
        }
    
        .close_modal {
            display         : flex;
            align-content   : center;
            justify-content : center;
            position        : absolute;
            padding         : 5px;
            top             : 7px;
            right           : 5px;
            cursor          : pointer;
            border-radius   : 50%;
    
            svg {
                width  : 22px;
                height : 22px;
                color  : var(--red);
            }
    
            &:hover {
                background-color : var(--content);
            }
        }
    }
`;