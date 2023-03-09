import React from 'react'
import { usePopper } from "react-popper";
import styled from 'styled-components';

const Tooltip = (props) => {
    const { placement, content, children, key, closeOn } = props

    const [open, setOpen] = React.useState(false)

    const popperElRef = React.useRef(null)
    const [targetElement, setTargetElement] = React.useState(null)
    const [popperElement, setPopperElement] = React.useState(popperElRef.current)
    const [arrowElement, setArrowElement] = React.useState(null)

    const { styles, attributes } = usePopper(
        targetElement,
        popperElement,
        {
            placement: placement || "top",
            modifiers: [
                {
                    name: "offset",
                    options: {
                        offset: [0, 12]
                    }
                },
                {
                    name: 'arrow',
                    options: {
                        element: arrowElement,
                    },
                },
                {
                    name: 'computeStyles',
                    options: {
                        adaptive: false,
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        altAxis: true,
                        padding: 30
                    },
                }
            ],
            update: () => setPopperElement(popperElRef.current),
            forceUpdate: () => setPopperElement(popperElRef.current),
        }
    )

    React.useEffect(() => {
        if (open)
            setPopperElement(popperElRef.current)
    }, [open])

    return (
        <>
            <ToolTip
                className={`${open && !closeOn ? "open" : "closed"}`}
                id="tooltip"
                role="tooltip"
                ref={popperElRef}
                style={styles.popper}
                {...attributes.popper}
                key={key}
            >
                {content}
                <div className="tooltip-arrow" ref={setArrowElement} style={styles.arrow} data-popper-arrow></div>
            </ToolTip>
            <TooltipTarget ref={setTargetElement} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                {children}
            </TooltipTarget>
        </>
    )
}

export default Tooltip

const ToolTip = styled.div`
    display       : flex;
    position      : absolute;
    width         : auto;
    padding       : 10px 20px;
    min-width     : 180px;
    color         : var(--text);
    text-align    : center;
    border-radius : var(--rounded-sm);
    background    : var(--tooltip);
    box-shadow    : var(--shadow-relief), var(--shadow-two);
    z-index       : 700;
    visibility    : hidden;
    opacity       : 0;
    transition    : visibility .2s, opacity .2s;

    &.open {
        opacity          : 1;
        visibility       : visible;
        transition-delay : 1s;

        .tooltip-arrow {
            &:before {
                visibility : visible;
            }
        }
    }
    
    .tooltip-arrow {
        position   : absolute;
        width      : 12px;
        height     : 12px;
        background : inherit;
        visibility : hidden;
        box-shadow : var(--shadow-relief), var(--shadow-tiny);
        
        &:before {
            content       : '';
            position      : absolute;
            width         : 12px;
            height        : 12px;
            background    : inherit;
            border-radius : var(--rounded-sm);
            visibility    : hidden;
            transform     : rotate(45deg);
            transition    : visibility 5s;
        }
    }

    &[data-popper-placement^='top'] > .tooltip-arrow {
        bottom : -7px;
        &:before {
            border-bottom : 1px solid var(--light-border);
            border-right  : 1px solid var(--light-border);
        }
    }
    
    &[data-popper-placement^='bottom'] > .tooltip-arrow {
        top : -7px;
        &:before {
            border-top  : 1px solid var(--light-border);
            border-left : 1px solid var(--light-border);
        }
    }
    
    &[data-popper-placement^='left'] > .tooltip-arrow {
        right : -7px;
        &:before {
            border-top   : 1px solid var(--light-border);
            border-right : 1px solid var(--light-border);
        }
    }
    
    &[data-popper-placement^='right'] > .tooltip-arrow {
        left : -7px;
        &:before {
            border-top  : 1px solid var(--light-border);
            border-left : 1px solid var(--light-border);
        }
    }

    p {
        color      : var(--primary);
        font-size  : 13px;
        text-align : center;
    }
`

const TooltipTarget = styled.div`
    display : flex;
`