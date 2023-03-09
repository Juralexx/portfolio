import React from 'react'
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';
import useTheme from './theme/useTheme';
import styled from 'styled-components';

const StarsParticles = () => {
    const { darkMode } = useTheme()

    const particlesInit = React.useCallback(async engine => await loadFull(engine), [])

    return (
        <ParticlesContainer>
            <Particles
                id="tsparticles__stars"
                init={particlesInit}
                options={{
                    backgroundMode: {
                        zIndex: 100,
                        enable: false
                    },
                    background: {
                        color: "transparent"
                    },
                    detectRetina: false,
                    fpsLimit: 30,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            resize: true
                        }
                    },
                    particles: {
                        color: {
                            value: darkMode ? "#fff" : "#000"
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 1080
                            },
                            limit: 0,
                            value: 400
                        },
                        opacity: {
                            animation: {
                                enable: true,
                                minimumValue: 0.05,
                                speed: 0.25,
                                sync: false
                            },
                            random: {
                                enable: true,
                                minimumValue: 0.05
                            },
                            value: 1
                        },
                        shape: {
                            type: "circle"
                        },
                        size: {
                            random: {
                                enable: true,
                                minimumValue: 0.5
                            },
                            value: 1
                        }
                    }
                }}
            />
        </ParticlesContainer>
    )
}

export default React.memo(StarsParticles)

const ParticlesContainer = styled.div`
    width      : 100%;
    min-height : 100%;

    #tsparticles__stars {
        position : absolute;
        left     : 0;
        top      : 0;
        width    : 100%;
        height   : 100%;
        z-index  : -1;

        canvas {
            position : absolute !important;
            left     : 0;
            top      : 0;
            width    : 100%;
            height   : 100%;
        }
    }
`