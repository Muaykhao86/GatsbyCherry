import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export const query = graphql`
query($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    html
    frontmatter{
        title
    }
  }
  }
`

export default ({data}) => {
    const post = data.markdownRemark;
    console.log(post)
    return (
        <Layout>
            <div className="">
                <h1>{post.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html}}/>
            </div>
        </Layout>
    )
}


