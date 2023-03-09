import useMediaQuery from 'components/tools/hooks/useMediaQuery'
import React from 'react'

export const MediaContext = React.createContext()

const MediaContextProvider = (props) => {
    const xs = useMediaQuery('(max-width: 576px)')
    const sm = useMediaQuery('(max-width: 768px)')
    const md = useMediaQuery('(max-width: 992px)')
    const lg = useMediaQuery('(max-width: 1200px)')
    const xl = useMediaQuery('(max-width: 1366px)')

    return (
        <MediaContext.Provider value={{ xs, sm, md, lg, xl }}>
            {props.children}
        </MediaContext.Provider>
    )
}

export default MediaContextProvider