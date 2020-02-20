import React from "react"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import GlobalStyle from "src/styles/global"
import ProjectList from "src/components/projectList.js"
import Header from "src/components/Header.js"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

const IndexPage = props => {
  const data = useStaticQuery(graphql`
    query Images {
      image: file(relativePath: { eq: "icon-no-background.png" }) {
        id
        childImageSharp {
          fixed(width: 48) {
            ...GatsbyImageSharpFixed
          }
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const Logo = styled.div`
    position: fixed;
    top: 50px;
    left: 96px;
    z-index: 10;
  `
  return (
    <Layout>
      <SEO title="Home" />
      <GlobalStyle />
      <Logo>
        <Img fixed={data.image.childImageSharp.fixed} />
      </Logo>
      <Header />
      <ProjectList />
    </Layout>
  )
}

export default IndexPage
