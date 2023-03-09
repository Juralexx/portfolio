const path = require("path");
const dotenv = require("dotenv")
dotenv.config({ path: '.env' })

module.exports = {
    siteMetadata: {
        title: `Alexandre Vurbier - Développeur / intégrateur web`,
        description: `Alexandre Vurbier - Développeur / intégrateur web`,
        author: `Alexandre Vurbier`,
        image: `/og.jpg`,
        siteUrl: `https://www.alexandrevurbier.com`,
        domain: `www.alexandrevurbier.com`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-image`,
        {
            resolve: "gatsby-plugin-root-import",
            options: {
                root: path.join(__dirname, "src"),
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/static/`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'markdown',
                path: `${__dirname}/markdown/`,
            },
        },
        `gatsby-transformer-remark`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#38bdf8`,
                display: `minimal-ui`,
                icon: `static/logo.png`,
            },
        },
        {
            resolve: 'gatsby-remark-audio',
            options: {
                preload: 'auto',
                loop: false,
                controls: true,
                muted: false,
                autoplay: false
            }
        },
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-netlify`,
        'gatsby-plugin-remove-console'
    ],
}