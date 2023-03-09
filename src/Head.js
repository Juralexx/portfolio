import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import useThemeColor from "components/hooks/useThemeColor"

const Head = ({ title, description, image }) => {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : ''

    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    defaultTitle: title
                    defaultDescription: description
                    siteUrl
                    defaultImage: image
                }
            }
        }
    `)

    const { defaultTitle, defaultDescription, siteUrl, defaultImage } = site.siteMetadata

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${image || defaultImage}`,
        url: `${siteUrl}${pathname}`
    }

    const { color } = useThemeColor()

    return (
        <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
            <html lang="fr" />
            {color.name === 'light' || color.name === 'dark' ? (
                <link rel="icon" href="/favicons/favicon-32x32.png" />
            ) : (
                color.name !== null &&
                <link rel="icon" href={`/favicons/favicon-32x32-${color.name}.png`} />
            )}
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />

            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />

            {/* <!-- Google tag (gtag.js) --> */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`}></script>
            <script>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());

                    gtag('config', '${process.env.GATSBY_GTAG}');
                `}
            </script>
        </Helmet>
    )
}

Head.defaultProps = {
    lang: `fr`,
    meta: [],
    description: ``,
}

Head.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
}

export default Head