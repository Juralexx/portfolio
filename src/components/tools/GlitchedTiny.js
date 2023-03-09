import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const GlitchedTiny = ({ text, HTMLElement, useRef }) => {
    return (
        <Subtitle>
            <HTMLElement className="__small-glitched __subtitle" data-text={text} ref={useRef}>
                {text}
            </HTMLElement>
        </Subtitle>
    )
}

export default React.memo(GlitchedTiny)

GlitchedTiny.propTypes = {
    HTMLElement: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

const Subtitle = styled.div`
    .__small-glitched {
        position  : relative;
        
        @media(min-width: 993px) {
            animation : 4s glitch 3s linear infinite;

            &:before,
            &:after {
                content  : attr(data-text);
                position : absolute;
                left     : 0;
            }
            &:before {
                animation         : glitchTop 3s linear infinite;
                clip-path         : polygon(0 0, 100% 0, 100% 33%, 0 33%);
                -webkit-clip-path : polygon(0 0, 100% 0, 100% 33%, 0 33%);
            }
            &:after{
                animation         : glitchBottom 2.5s linear infinite;
                clip-path         : polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
                -webkit-clip-path : polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
            }
        }

        @keyframes glitch {
            2%,64%{
                transform : translate(2px,0) skew(0deg);
            }
            4%,60%{
                transform : translate(-2px,0) skew(0deg);
            }
            62%{
                transform : translate(0,0) skew(5deg);
            }
        }

        @keyframes glitchTop {
            2%,64%{
                transform : translate(2px,-2px);
            }
            4%,60%{
                transform : translate(-2px,2px);
            }
            62%{
                transform : translate(13px,-1px) skew(-13deg);
            }
        }

        @keyframes glitchBottom {
            2%,64%{
                transform : translate(-2px,0);
            }
            4%,60%{
                transform : translate(-2px,0);
            }
            62%{
                transform : translate(-22px,5px) skew(21deg);
            }
        }
    }
`