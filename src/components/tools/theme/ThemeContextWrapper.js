import React from 'react';
import { replaceBodyClass } from '../../../Utils';

export const ThemeContext = React.createContext()

export default function ThemeContextWrapper(props) {
    const [theme, setTheme] = React.useState({ preference: null, theme: null })

    const themes = ['light', 'dark', 'orange', 'yellow', 'green', 'navy', 'purple', 'pink', 'red']

    const manageTheme = (name) => {
        document.body.classList.remove(...themes)
        document.body.classList.add(name)
        localStorage.setItem("theme", JSON.stringify({ preference: name, theme: name }))
        setTheme({ preference: name, theme: name })
    }

    /**
     * Check theme on window load
     */

    function checkTheme() {
        const themeStorage = JSON.parse(localStorage.getItem("theme"))
        if (theme.preference === null) {
            if (themeStorage !== null) {
                const preference = themeStorage.preference
                if (preference === 'light') {
                    return manageTheme('light')
                } else if (preference === 'dark') {
                    return manageTheme('dark')
                } else if (preference === 'purple') {
                    return manageTheme('purple')
                } else if (preference === 'orange') {
                    return manageTheme('orange')
                } else if (preference === 'green') {
                    return manageTheme('green')
                } else if (preference === 'navy') {
                    return manageTheme('navy')
                } else if (preference === 'yellow') {
                    return manageTheme('yellow')
                } else if (preference === 'pink') {
                    return manageTheme('pink')
                } else if (preference === 'red') {
                    return manageTheme('red')
                } else if (preference === "prefers-color-scheme") {
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        replaceBodyClass('dark', 'light')
                        setTheme({
                            preference: 'prefers-color-scheme',
                            theme: 'dark'
                        })
                    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                        replaceBodyClass('light', 'dark')
                        setTheme({
                            preference: 'prefers-color-scheme',
                            theme: 'light'
                        })
                    }
                }
            } else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    replaceBodyClass('dark', 'light')
                    localStorage.setItem("theme", JSON.stringify({
                        preference: 'prefers-color-scheme',
                        theme: 'dark'
                    }))
                    setTheme({
                        preference: 'prefers-color-scheme',
                        theme: 'dark'
                    })
                } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    replaceBodyClass('light', 'dark')
                    localStorage.setItem("theme", JSON.stringify({
                        preference: 'prefers-color-scheme',
                        theme: 'light'
                    }))
                    setTheme({
                        preference: 'prefers-color-scheme',
                        theme: 'light'
                    })
                }
            }
        }
    }

    /**
     * Detect user system prefers-color-scheme change
     */

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    replaceBodyClass('dark', 'light')
                    localStorage.setItem("theme", JSON.stringify({
                        preference: 'prefers-color-scheme',
                        theme: 'dark'
                    }))
                    setTheme({
                        preference: 'prefers-color-scheme',
                        theme: 'dark'
                    })
                } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    replaceBodyClass('light', 'dark')
                    localStorage.setItem("theme", JSON.stringify({
                        preference: 'prefers-color-scheme',
                        theme: 'light'
                    }))
                    setTheme({
                        preference: 'prefers-color-scheme',
                        theme: 'light'
                    })
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * Select theme function
     * @param {*} choice Theme name
     */

    const handleTheme = (choice) => {
        if (choice === 'light') {
            manageTheme('light')
        } else if (choice === 'dark') {
            manageTheme('dark')
        } else if (choice === 'purple') {
            manageTheme('purple')
        } else if (choice === 'orange') {
            manageTheme('orange')
        } else if (choice === 'green') {
            manageTheme('green')
        } else if (choice === 'navy') {
            manageTheme('navy')
        } else if (choice === 'yellow') {
            manageTheme('yellow')
        } else if (choice === 'pink') {
            manageTheme('pink')
        } else if (choice === 'red') {
            manageTheme('red')
        } else if (choice === 'prefers-color-scheme') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.remove(...themes)
                document.body.classList.add('dark')
                localStorage.setItem("theme", JSON.stringify({
                    preference: 'prefers-color-scheme',
                    theme: 'dark'
                }))
                setTheme({
                    preference: 'prefers-color-scheme',
                    theme: 'dark'
                })
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                document.body.classList.remove(...themes)
                document.body.classList.add('light')
                localStorage.setItem("theme", JSON.stringify({
                    preference: 'prefers-color-scheme',
                    theme: 'light'
                }))
                setTheme({
                    preference: 'prefers-color-scheme',
                    theme: 'light'
                })
            }
        }
        const themeEvent = new CustomEvent("themeChange", {
            detail: {
                theme: choice,
            },
        });
        window.dispatchEvent(themeEvent);
    }


    if (typeof window !== 'undefined') {
        window.load = checkTheme()
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, handleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}