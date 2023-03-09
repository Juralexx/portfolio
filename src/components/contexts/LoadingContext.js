import React from 'react'

export const LoadingContext = React.createContext()

const LoadingContextProvider = (props) => {

    return (
        <LoadingContext.Provider value={props.value}>
            {props.children}
        </LoadingContext.Provider>
    )
}

export default LoadingContextProvider