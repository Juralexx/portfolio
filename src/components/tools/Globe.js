import React from 'react'
import { geoOrthographic, geoPath } from 'd3';
import world from '../data/json/world.json'
import graticules from '../data/json/graticules.json'
import styled from 'styled-components';
import useThemeColor from 'components/hooks/useThemeColor';

const Globe = () => {
    // const [rotation, setRotation] = React.useState(0)
    // window.requestAnimationFrame(() => setRotation(rotation + 0.3))
    const size = 900

    const worldProjection = geoOrthographic()
        .fitSize([size, size], world)
    const worldGeoGenerator = geoPath()
        .projection(worldProjection)
    const worldPath = worldGeoGenerator(world)

    const graticulesProjection = geoOrthographic()
        .fitSize([size, size], graticules)
    // .clipAngle(180)
    // .rotate([rotation])
    const graticulesGeoGenerator = geoPath()
        .projection(graticulesProjection)
    const graticulesPath = graticulesGeoGenerator(graticules)

    /**
     * 
     */

    const { color } = useThemeColor()

    return (
        <GlobeContainer className='globe' style={{ width: size, height: size }}>
            <div className='globe__inner'>
                <svg className='worldpath_one' width={size} height={size}>
                    <path d={worldPath} style={{ stroke: color.hex, fill: `rgba(${color.rgb}, 0.08)`, background: '' }} />
                    <path d={graticulesPath} style={{ stroke: color.hex, fill: 'none', opacity: '.2' }} />
                </svg>
                <svg className='worldpath_two' width={size} height={size}>
                    <path d={worldPath} style={{ stroke: color.hex, fill: `rgba(${color.rgb}, 0.08)`, background: '' }} />
                </svg>
            </div>
        </GlobeContainer>
    )
}

export default React.memo(Globe)

const GlobeContainer = styled.div`
    position  : absolute;
    margin    : 0 auto;
    right     : -10%;
    bottom    : -340px;
    transform : scale(1.4);
    z-index   : -1;

    .globe__inner {
        position : relative;
        width    : 100%;
        height   : 100%;
        svg {
            position : absolute;
            &.worldpath_two {
                bottom : 5px;
            }
        }
    }

    @media(max-width: 1200px) {
        transform : scale(1.2);
        right     : -20%;
    }

    @media(max-width: 992px) {
        transform : scale(0.9);
        right     : -30%;
    }
    @media(max-width: 576px) {
        right : -60%;
    }
`