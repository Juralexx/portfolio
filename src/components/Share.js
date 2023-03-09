import React from "react";
import styled from "styled-components";
import Tooltip from "./tools/global/Tooltip";
import Icon from "./tools/icons/Icon";
import { FacebookShareButton, LinkedinShareButton, PinterestShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { useClickOutside } from "./tools/hooks/useClickOutside";
import { addClass } from 'Utils'

const Share = () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const shareRef = React.useRef()
    const [active, setActive] = React.useState(false)
    useClickOutside(shareRef, () => setActive(false))

    const socialsArr = [{
        button: FacebookShareButton,
        name: 'Facebook',
        picto: <Icon name="Facebook" />
    }, {
        button: LinkedinShareButton,
        name: 'Linkedin',
        picto: <Icon name="Linkedin" />
    }, {
        button: PinterestShareButton,
        name: 'Pinterest',
        picto: <Icon name="Pinterest" />
    }, {
        button: TwitterShareButton,
        name: 'Twitter',
        picto: <Icon name="Twitter" />
    }, {
        button: WhatsappShareButton,
        name: 'Whatsapp',
        picto: <Icon name="Whatsapp" />
    }]

    return (
        <Tooltip placement="bottom" content="Partager cette page" closeOn={active}>
            <ShareContainer className="__share" ref={shareRef}>
                <ShareHandler className={addClass(active, 'active')} onClick={() => setActive(!active)}>
                    <Icon name="Share" />
                </ShareHandler>
                {active &&
                    <ShareButtons>
                        <div className="__title">
                            Partager cette page
                        </div>
                        {socialsArr.map((network, key) => {
                            return (
                                <network.button resetButtonStyle={false} url={url} media={url} key={key} onClick={() => setActive(!active)}>
                                    {network.picto}
                                    <p>{network.name}</p>
                                </network.button>
                            )
                        })}
                    </ShareButtons>
                }
            </ShareContainer>
        </Tooltip>
    )
}

export default React.memo(Share)

const ShareContainer = styled.div`
    position : relative;
    z-index  : 100;
`

const ShareHandler = styled.div`
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
`

const ShareButtons = styled.div`
    position         : absolute;
    top              : 110%;
    right            : 0;
    display          : flex;
    flex-direction   : column;
    align-items      : center;
    justify-content  : center;
    padding          : 5px 0;
    width            : 220px;
    border-radius    : var(--rounded-sm);
    box-shadow       : var(--shadow-relief), var(--shadow-two);
    background-color : var(--body-light);

    button {
        position        : relative;
        display         : flex;
        align-items     : center;
        justify-content : flex-start;
        width           : 100%;
        height          : 36px;
        font-size       : 20px;
        padding         : 0 12px;
        background      : transparent;
        border          : none;
        color           : var(--text);
        cursor          : pointer;

        p {
            font-size   : 14px;
            margin-left : 10px;
            margin-top  : 2px;
            font-weight : 600;
        }

        svg {
            height : 22px;
            width  : 22px;
            color  : var(--slate);
        }

        &:hover {
            background : rgba(var(--primary-rgb), 0.1);
            svg {
                color : var(--primary);
            }
        }
    }

    .__title {
        width       : 100%;
        padding     : 5px 12px;
        font-size   : 14px;
        font-weight : 700;
    }
`