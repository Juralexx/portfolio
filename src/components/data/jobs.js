import { graphql, useStaticQuery } from "gatsby";

export const useExperience = () => {

    const jobs = useStaticQuery(graphql`
        query {
            web: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/jobs/web/" } }
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        frontmatter {
                            title
                            company
                            company2
                            location
                            range
                            url
                            url2
                        }
                        html
                    }
                }
            }
            others: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/jobs/others/" } }
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        frontmatter {
                            title
                            company
                            location
                            range
                            url
                        }
                        html
                    }
                }
            }
        }
  `);

    return { webJobs: jobs.web.edges, othersJobs: jobs.others.edges }
}