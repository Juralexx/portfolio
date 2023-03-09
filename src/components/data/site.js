import { graphql, useStaticQuery } from "gatsby"

export const useSiteDatas = () => {

    const site = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title,
                    description,
                    author,
                    image,
                    siteUrl,
                    domain
                }
            }
        }
    `)

    return site.site.siteMetadata
}