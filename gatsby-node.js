const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`);
// const { default: blogPost } = require(`./src/Templates/blog-post`);



exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions
    if(node.internal.type === `MarkdownRemark`){
        const slug = createFilePath({node, getNode})

        createNodeField({
            node,
            name:`slug`,
            value: slug
        })

    } 
}

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;
    return graphql(`
{
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
    `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                // need a relative path to be created using node.path
                component: path.resolve(`./src/Templates/blog-post.js`),
                context: {
                    slug: node.fields.slug
                }
            })
        })
    })
}