import { graphql, useStaticQuery } from "gatsby";

export const useSchools = () => {

    const datas = useStaticQuery(graphql`
        query {
            schools: allMarkdownRemark (
                filter: { fileAbsolutePath: { regex: "/schools/" } }
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        frontmatter {
                            date
                            formation
                            school
                            location
                            range
                        }
                    }
                }
            }
        }
    `)

    return datas.schools.edges
}