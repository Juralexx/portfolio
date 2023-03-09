import { graphql, useStaticQuery } from "gatsby";

export const useAllProjects = () => {

    const datas = useStaticQuery(graphql`
        query {
            personal: allMarkdownRemark (
                filter: { fileAbsolutePath: { regex: "/projects/personal/" } }
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        frontmatter {
                            date
                            title
                            tech
                            github
                            external
                            company
                        }
                        html
                    }
                }
            }
            company: allMarkdownRemark (
                filter: { fileAbsolutePath: { regex: "/projects/company/" } }
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        frontmatter {
                            date
                            title
                            tech
                            github
                            external
                            company
                        }
                        html
                    }
                }
            }
        }
    `)

    return datas
}