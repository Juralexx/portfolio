import React from 'react'
import Xarrow from 'react-xarrows'
import styled from 'styled-components'
import useThemeColor from 'components/hooks/useThemeColor'
import { randomNbLtID } from 'Utils'

const HeroLine = (props) => {
    const { start, startAnchor, end, endAnchor, headSize, strokeWidth, curveness, showHead = true, showTail = true, _cpx1Offset = 0, _cpy1Offset = 0, _cpx2Offset = 0, _cpy2Offset = 0 } = props

    const { color, colors } = useThemeColor()
    const [pathColor, setPathColor] = React.useState('transparent')
    React.useEffect(() => {
        window.addEventListener('themeChange', event => {
            const c = colors.find(v => v.name === event.detail.theme)
            if (c) {
                setPathColor(c.hex)
            } else {
                const clr = colors.find(v => v.name === 'dark')
                setPathColor(clr.hex)
            }
        })
    }, [colors])

    const [id] = React.useState(randomNbLtID(10))

    const path = typeof document !== 'undefined' ? document.getElementById(id) : null

    const drawOnScroll = React.useCallback(() => {
        if (path !== null) {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length
            path.style.strokeDashoffset = length
            const boundings = path.getBoundingClientRect()

            const scrolledFromTop = document.documentElement.scrollTop
            const partiallyVisible = (boundings.top - 300) < scrolledFromTop

            if (partiallyVisible) {
                path.style.strokeDashoffset = 0
                setPathColor(color.hex)
            } else {
                setPathColor('transparent')
                if (boundings.top < scrolledFromTop) {
                    path.style.strokeDashoffset = length;
                }
            }
        }
    }, [path, color.hex])

    React.useEffect(() => {
        window.addEventListener("scroll", drawOnScroll);
        return () => window.removeEventListener('scroll', drawOnScroll)
    }, [drawOnScroll])

    return (
        <Line pathColor={pathColor}>
            <Xarrow
                passProps={{ id: id }}
                start={start}
                startAnchor={startAnchor}
                end={end}
                endAnchor={endAnchor}
                strokeWidth={strokeWidth || 3}
                lineColor={pathColor}
                curveness={curveness || 0.5}
                showHead={showHead}
                headSize={headSize || 7}
                headShape={{
                    svgElem:
                        <svg className="spinner-start" width="1pt" height="1pt" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <circle className='outline' cx=".5" cy=".5" r="0.437" fill="none" strokeWidth=".05" stroke='currentColor'></circle>
                            <circle className='point' cx=".5" cy=".5" r="0.187" fill='currentColor' strokeWidth="0"></circle>
                        </svg>,
                    offsetForward: 0.60
                }}
                headColor={pathColor}
                showTail={showTail}
                tailSize={headSize || 7}
                tailShape={{
                    svgElem:
                        <svg className="spinner-end" width="1pt" height="1pt" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <circle className='outline' cx=".5" cy=".5" r="0.437" fill="none" strokeWidth=".05" stroke='currentColor'></circle>
                            <circle className='point' cx=".5" cy=".5" r="0.187" fill='currentColor' strokeWidth="0"></circle>
                        </svg>,
                    offsetForward: 0.60
                }}
                tailColor={pathColor}
                // _debug={true}
                _cpx1Offset={_cpx1Offset}
                _cpy1Offset={_cpy1Offset}
                _cpx2Offset={_cpx2Offset}
                _cpy2Offset={_cpy2Offset}
            />
        </Line>
    )
}

export default HeroLine

const Line = styled.div`
    z-index : -1;
    color   : transparent;

    path {
        transition : all 1s ease-in-out;
    }

    .spinner-start {
        circle {
            &.outline {
                stroke     : ${props => props.pathColor && props.pathColor};
                opacity    : ${props => props.pathColor === 'transparent' ? '0' : '1'};
                transition : all 2s ease-in-out;
            }
            &.point {
                fill       : ${props => props.pathColor && props.pathColor};
                opacity    : ${props => props.pathColor === 'transparent' ? '0' : '1'};
                transition : all 2s ease-in-out;
            }
        }
    }

    .spinner-end {
        circle {
            &.outline {
                stroke     : ${props => props.pathColor && props.pathColor};
                opacity    : ${props => props.pathColor === 'transparent' ? '0' : '1'};
                transition : all 1s ease-in-out;
            }
            &.point {
                fill       : ${props => props.pathColor && props.pathColor};
                opacity    : ${props => props.pathColor === 'transparent' ? '0' : '1'};
                transition : all 1s ease-in-out;
            }
        }
    }
`