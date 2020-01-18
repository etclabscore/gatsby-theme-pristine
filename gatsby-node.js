/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path");
const _ = require("lodash");
const slash = require(`slash`)
const defaultTemplate = path.resolve(__dirname, "src/templates/default.tsx");

function findDoc(doc) {
  if (!doc.link) return null
  return (
    doc.link === this.link ||
    doc.link === this.link.substring(0, this.link.length - 1)
  )
}

function getSibling(index, list, direction) {
  if (direction === `next`) {
    const next = index === list.length - 1 ? null : list[index + 1]
    return next
  } else if (direction === `prev`) {
    const prev = index === 0 ? null : list[index - 1]
    return prev
  } else {
    reporter.warn(
      `Did not provide direction to sibling function for building next and prev links`
    )
    return null
  }
}

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  return new Promise((resolve, reject) => {
    // Query for markdown nodes to use in creating pages.
    graphql(`
      query {
        site {
          siteMetadata {
            title
            menuLinks {
              name
              link
              ignoreNextPrev
            }
          }
        }
        allMdx(
          sort: { order: ASC, fields: [fields___slug] }
          limit: 10000
          filter: { fileAbsolutePath: { ne: null } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        return reject(result.errors)
      }
      const allPages = result.data.allMdx.edges;
      const links = result.data.site.siteMetadata.menuLinks;
      allPages.forEach(({ node }) => {
        const slug = _.get(node, `fields.slug`);
        console.log(node, slug);
        if (!slug) return;
        const docIndex = links.findIndex(findDoc, {
          link: slug
        });
        let nextAndPrev = {}
        if (docIndex > -1) {
          nextAndPrev.prev = links[docIndex - 1] || null;
          nextAndPrev.next = links[docIndex + 1] || null;
        }
        if (nextAndPrev.prev && nextAndPrev.prev.ignoreNextPrev) {
          delete nextAndPrev.prev;
        }
        if (nextAndPrev.next && nextAndPrev.next.ignoreNextPrev) {
          delete nextAndPrev.next;
        }
        console.log("defaulttejplkatpath", docIndex, nextAndPrev, node.fields.slug);
        createPage({
          path: `${node.fields.slug}`, // required
          component: slash(defaultTemplate),
          context: {
            slug: node.fields.slug,
            ...nextAndPrev,
          },
        });
      });
      resolve();
    });
  })

};

// Create slugs for files, set released status for blog posts.
exports.onCreateNode = ({ node, actions, getNode, reporter }) => {
  const { createNodeField } = actions
  const isMarkdown = [`MarkdownRemark`, `Mdx`].includes(node.internal.type) && getNode(node.parent).internal.type === `File`
  const isTypescriptJSX = node.extension === "tsx" && node.internal.type === "File"

  if (isTypescriptJSX) {
    const parsedFilePath = path.parse(node.relativePath)
    if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}`
    } else if (parsedFilePath.dir === ``) {
      slug = `/${parsedFilePath.name}`
    } else {
      slug = `/${parsedFilePath.dir}`
    }
    console.log("slug for  ", node.absolutePath, slug);
    if (slug) {
      return createNodeField({ node, name: `slug`, value: slug })
    }
  }
  if (isMarkdown) {
    const parsedFilePath = path.parse(node.fileAbsolutePath)
    console.log(parsedFilePath);
    if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `/${parsedFilePath.name}`
    } else {
      slug = `/${parsedFilePath.name}`
    }

    console.log("slug for  ", node.fileAbsolutePath, slug);
    return createNodeField({ node, name: `slug`, value: slug });
  }

  return null;
}
