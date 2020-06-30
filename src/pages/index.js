import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`
const BlogTitle = styled.h3`
  margin-bottom: 20px;
  `

// gatsby knows this is graphql and will attach the query to our component and export both
export const query = graphql`
query {
  allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC})  {
    edges {
      node {
        id
        frontmatter {
          date
          description
          title
        }
        fields{
          slug
        }
        excerpt
      }
    }
    totalCount
  }
}
`;


export default ({data}) => {
console.log(data);
return (
  <Layout>
    <SEO title="Home" />
    <div className="">
      <h1>My Thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    </div>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    {data.allMarkdownRemark.edges.map(({node}) => (
      <div key={node.id}>
        <BlogLink to={node.fields.slug}>
        <BlogTitle>{node.frontmatter.title} - {node.frontmatter.date}</BlogTitle>
        <p>{node.excerpt}</p>
        </BlogLink>
      </div>
    ))}
    <BlogLink to="/page-2/">Go to page 2</BlogLink> <br />
    <BlogLink to="/page-3/">Go to page 3</BlogLink> <br />
    <BlogLink to="/using-typescript/">Go to "Using TypeScript"</BlogLink>
  </Layout>
)}




