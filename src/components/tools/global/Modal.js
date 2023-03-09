import React from 'react'
import styled from 'styled-components'
import Icon from '../icons/Icon';

const removeScrollY = () => {
    if (document.body.classList.contains('no-scroll')) {
        document.body.classList.remove('no-scroll');
    } else {
        document.body.classList.add('no-scroll');
    }
}

const Modal = (props) => {
    const { open, setOpen, onClose } = props

    React.useEffect(() => { if (open) removeScrollY() }, [open])

    const close = () => {
        setOpen(false)
        removeScrollY()
        if (onClose) {
            onClose()
        }
    }

    return (
        <>
            <ModalWrapper className={open ? "modal_wrapper" : "modal_wrapper hide_wrapper"}>
                <div className={open ? 'modal_container show_modal' : 'modal_container hide_modal'}>
                    <Icon name="Cross" className="close_modal" aria-hidden="true" aria-label="modal-button" onClick={close} />
                    {props.children}
                </div>
            </ModalWrapper>
            <ModalCover className={open ? 'modal_cover modal_cover-active' : 'modal_cover'} onClick={close}></ModalCover>
        </>
    )
}

export default Modal


const ModalWrapper = styled.div`
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
        visibility      : hidden;
        backdrop-filter : none;
    }

    .modal_container {
        margin           : auto;
        width            : 550px;
        padding          : 35px 25px;
        color            : var(--text);
        background-color : var(--content);
        border-radius    : var(--rounded-sm);
        box-shadow       : var(--shadow-relief), var(--shadow-two);
        border           : 1px solid var(--light-border);
        z-index          : 100000000000;

        @media(max-width: 768px) {
            width : 85%;
        }

        @media(max-width: 576px) {
            width      : 100vw;
            min-height : 100vh;
            padding    : 30px 15px
        }
    
        h2 {
            padding-bottom : 7px;
            margin-bottom  : 10px;
            font-size      : 20px !important;
            font-weight    : 600;
            text-align     : center;
            font-size      : 30px !important;
    
            &.title_border {
                border-bottom : 1px solid var(--text-tertiary);
            }
        }

        button {
            margin-top : 40px;
            padding    : 20px 28px;
            min-width  : 240px;
            height     : 46px;
            font-size  : var(--font-md);
            margin     : 0 auto;
            margin-top: 30px;
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
            width           : 32px;
            height          : 32px;
            color           : var(--primary);
            cursor          : pointer;
            border-radius   : 50%;
    
            &:hover {
                background-color : var(--content);
            }
        }
    }
`;

const ModalCover = styled.div`
    display    : none;
    position   : fixed;
    top        : 0;
    bottom     : 0;
    left       : 0;
    right      : 0;
    background : var(--modal-cover);
    z-index    : 100000;

    &.modal_cover-active {
        display : block;
    }
`;