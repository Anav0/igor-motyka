require("dotenv").config({
  path: ".env",
})
module.exports = {
  siteMetadata: {
    title: `Igor Motyka's personal website`,
    description: `Fullstack developer portfolio`,
    author: `Igor Motyka`,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GA_ID,
        head: true,
      },
    },
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL:
          process.env.NODE_ENV === `production`
            ? process.env.GATSBY_API_URL
            : "http://localhost:1337",
        contentTypes: [`project`, `career`, `design`, `demo`],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 100,
      },
    },
    `gatsby-transformer-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
