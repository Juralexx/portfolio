import React from 'react'

const useTheme = () => {
    const [darkMode, setDarkMode] = React.useState(false)
    const [storage, setStorage] = React.useState({})

    if (Object.keys(storage).length === 0) {
        if (typeof localStorage !== 'undefined') {
            setStorage(JSON.parse(localStorage.getItem("theme")))
        }
    }

    React.useEffect(() => {
        if (Object.keys(storage).length > 0 && storage.theme !== 'light') {
            setDarkMode(true)
        } else setDarkMode(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storage])

    React.useEffect(() => {
        window.addEventListener('themeChange', () => {
            setStorage(JSON.parse(localStorage.getItem("theme")))
        })
    }, [])

    return { darkMode }
}

export default useTheme