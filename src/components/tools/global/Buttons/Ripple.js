import React from "react";
import styled from "styled-components";

const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
    React.useLayoutEffect(() => {
        let bounce = null
        if (rippleCount > 0) {
            clearTimeout(bounce)

            bounce = setTimeout(() => {
                cleanUpFunction()
                clearTimeout(bounce)
            }, duration * 4)
        }

        return () => clearTimeout(bounce)
    }, [rippleCount, duration, cleanUpFunction])
}

const Ripple = () => {
    const [rippleArray, setRippleArray] = React.useState([])

    useDebouncedRippleCleanUp(rippleArray.length, 500, () => setRippleArray([]))

    const addRipple = (e) => {
        const rippleContainer = e.currentTarget.getBoundingClientRect()
        const size = rippleContainer.width > rippleContainer.height ? rippleContainer.width : rippleContainer.height
        const x = e.pageX - rippleContainer.x - size / 2
        const y = e.pageY - rippleContainer.y - size / 2
        const newRipple = { x, y, size }

        setRippleArray(arr => [...arr, newRipple])
    }

    return (
        <RippleContainer onMouseDown={addRipple} className="ripple">
            {rippleArray.length > 0 &&
                rippleArray.map((ripple, i) => {
                    return (
                        <span
                            key={i}
                            style={{
                                top: ripple.y,
                                left: ripple.x,
                                width: ripple.size,
                                height: ripple.size
                            }}
                        />
                    )
                })
            }
        </RippleContainer>
    )
}

export default Ripple

export const RippleContainer = styled.div`
    position : absolute;
    top      : 0;
    right    : 0;
    bottom   : 0;
    left     : 0;

    span {
        position           : absolute;
        transform          : scale(0);
        opacity            : 0.75;
        background-color   : rgba(var(--primary-rgb), 0.5);
        border-radius      : 100%;
        animation-name     : ripple;
        animation-duration : 1000ms;
    }

    @keyframes ripple {
        to {
            opacity   : 0;
            transform : scale(2);
        }
    }
`;
