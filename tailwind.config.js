module.exports = {
    experimental: {
        optimizeUniversalDefaults: true
    },
    content: [
        "./src/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/**/**/*.{js,ts,jsx,tsx}",
        "./src/**/**/**/*.{js,ts,jsx,tsx}",
        "./src/**/**/**/**/*.{js,ts,jsx,tsx}",
    ]
}