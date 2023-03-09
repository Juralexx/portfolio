import React from 'react'
import useWindowSize from 'components/tools/hooks/useWindowSize'
import useMousePosition from 'components/tools/hooks/useMousePosition'
import styled from 'styled-components'

const SphereTooltip = ({ hovered }) => {
    const tooltipRef = React.useRef(null)
    const { x, y } = useMousePosition()
    const { width: windowSize } = useWindowSize()
    const [styles, setStyles] = React.useState({})

    React.useEffect(() => {
        if (hovered.status === 'active') {
            const tooltipWidth = tooltipRef.current?.offsetWidth

            if (tooltipWidth) {
                setStyles({ top: y - 180, left: x - tooltipWidth })

                if (x - tooltipWidth < 0)
                    setStyles(prev => ({ ...prev, left: (tooltipWidth / 2) }))
                else if (x === windowSize)
                    setStyles(prev => ({ ...prev, left: windowSize }))
                else
                    setStyles(prev => ({ ...prev, left: x - (tooltipWidth / 2) }))
            }
        }
    }, [x, y, windowSize])

    return (
        hovered.status === 'active' && (
            <Tooltip className='honeycomb__tooltip' ref={tooltipRef} style={styles}>
                <div className='honeycomb_tooltip-inner'>
                    <div className='image'>
                        {hovered.element.image}
                    </div>
                    <p>
                        {hovered.element.data_title}
                    </p>
                </div>
            </Tooltip>
        )
    )
}

export default SphereTooltip

const Tooltip = styled.div`
    position      : fixed;
    left          : 50%;
    top           : 50%;
    transform     : translate(-50%, -50%);
    width         : 280px;
    height        : 100px;
    border-radius : var(--rounded-md);

    .honeycomb_tooltip-inner {
        width           : 100%;
        height          : 100%;
        padding         : 10px;
        background      : rgba(var(--primary-rgb), 0.1);
        backdrop-filter : blur(10px);
        border          : 1px solid var(--primary);
        border-radius   : var(--rounded-md);
        overflow        : hidden;
    }
    
    .image {
        position : absolute;
        right    : -40px;
        top      : -40px;
        opacity  : 0.5;
        svg {
            color  : var(--primary);
            width  : 100%;
            height : 100%;
            width  : 130px;
            height : 130px;
        }
        p {
            position  : relative;
            color     : var(--primary);
            font-size : 110px;
            margin    : 10px 0 0 0;
        }
    }
    p {
        position    : absolute;
        font-size   : 22px;
        font-weight : bold;
        bottom      : 10px;
        left        : 15px;
        color       : var(--primary);
        font-family : var(--font-fam2);
    }
`;