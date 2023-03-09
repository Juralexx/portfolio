import React from 'react'

const useThemeColor = () => {
    const [color, setColor] = React.useState({ name: null, hex: null, rgb: null })

    const colors = [
        { name: 'light', hex: '#38bdf8', rgb: '14, 165, 233' },
        { name: 'dark', hex: '#38bdf8', rgb: '14, 165, 233' },
        { name: 'purple', hex: '#626ed4', rgb: '98, 110, 212' },
        { name: 'orange', hex: '#f88e3a', rgb: '248, 142, 58' },
        { name: 'green', hex: '#2eac68', rgb: '46, 172, 104' },
        { name: 'navy', hex: '#64ffda', rgb: '100, 255, 218' },
        { name: 'yellow', hex: '#fbd566', rgb: '251, 213, 102' },
        { name: 'pink', hex: '#D25E96', rgb: '210, 94, 150' },
        { name: 'red', hex: '#f62528', rgb: '246, 37, 40' }
    ]

    React.useEffect(() => {
        const themeStorage = JSON.parse(localStorage.getItem("theme"))
        if (themeStorage !== null) {
            if (color.hex === null && color.rgb === null) {
                for (const c of colors) {
                    if (themeStorage.theme === c.name)
                        return setColor({ name: c.name, hex: c.hex, rgb: c.rgb })
                }
            }
        } else return setColor({ name: 'dark', hex: '#38bdf8', rgb: '14, 165, 233' })

        window.addEventListener('themeChange', event => {
            const c = colors.find(v => v.name === event.detail.theme)
            if (c) {
                return setColor({ name: c.name, hex: c.hex, rgb: c.rgb })
            } else {
                const clr = colors.find(v => v.name === 'dark')
                return setColor({ name: clr.name, hex: clr.hex, rgb: clr.rgb })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color])

    return { color, colors }
}

export default useThemeColor