const emoji = require("remark-emoji");

module.exports = {
  siteMetadata: {
    title: `Pristine`,
    description: `Pristine Gatsby Theme`,
    author: ``,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `src/docs`,
      },
    },
    "gatsby-remark-draw",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [emoji],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-draw",
            options: {
              strategy: "img"
            }
          }
        ],
      },
    },
    "gatsby-plugin-material-ui",
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: `${__dirname}/src/layouts/index.tsx`,
      },
    },
    "gatsby-plugin-typescript",
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-use-dark-mode",
  ],
}
