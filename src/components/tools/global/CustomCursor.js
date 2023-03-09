import React from "react";
// import { BsCursor } from "react-icons/bs";
import useMousePosition from "../hooks/useMousePosition";

/**
 * Pointer customizé
 */

const CustomCursor = () => {
    const { x, y } = useMousePosition()
    return (
        <div className="cursor" style={{ left: `${x}px`, top: `${y}px` }}>
            {/* <BsCursor /> */}
        </div>
    )
}

export default CustomCursor