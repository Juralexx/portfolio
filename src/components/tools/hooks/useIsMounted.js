import React from 'react';

const useIsMounted = (delay) => {
    const [isMounted, setisMounted] = React.useState(false)

    React.useEffect(() => {
        if (delay) {
            const timer = setTimeout(() => {
                setisMounted(true)
            }, delay)
            return () => clearTimeout(timer)
        } else setisMounted(true)
        return () => setisMounted(false)
    }, [delay])

    return isMounted
}

export default useIsMounted;