import { graphql, useStaticQuery } from "gatsby";

export const useProjectsToShow = () => {

    const projectsDatas = useStaticQuery(graphql`
        query {
            personal: allMarkdownRemark (
                filter: { 
                        fileAbsolutePath: { regex: "/projects/personal/" }
                        frontmatter: { showInProjects: { ne: false } }
                }
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
                            image {
                                childImageSharp {
                                    gatsbyImageData(width: 1800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                                }
                            }
                        }
                        html
                    }
                }
            }
            company: allMarkdownRemark (
                filter: { 
                        fileAbsolutePath: { regex: "/projects/company/" }
                        frontmatter: { showInProjects: { ne: false } }
                }
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

    return projectsDatas
}