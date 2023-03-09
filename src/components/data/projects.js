import { graphql, useStaticQuery } from "gatsby";

export const useMainProjects = () => {

    const projects = useStaticQuery(graphql`
    {
        featured: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/featured/" } }
            sort: { fields: [frontmatter___date], order: ASC }
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        cover {
                            childImageSharp {
                                gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                            }
                        }
                        tech
                        github
                        external
                    }
                    html
                }
            }
        }
    }`);

    return projects
}