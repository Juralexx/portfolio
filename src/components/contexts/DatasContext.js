import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

export const DatasContext = React.createContext()

const DatasContextProvider = (props) => {

    /**
     * Récuperation des données présentes dans 'gatsby-config.js'
    */

    const site = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title,
                    description,
                    author,
                    image,
                    siteUrl
                }
            }
        }
    `)

    const datas = site.site.siteMetadata

    return (
        <DatasContext.Provider value={datas}>
            {props.children}
        </DatasContext.Provider>
    )
}

export default DatasContextProvider