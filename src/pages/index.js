import React from "react"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import GlobalStyle from "src/styles/global"
import ProjectList from "src/components/projectList.js"
import Header from "src/components/Header.js"
import Navbar from "src/components/Navbar.js"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
const HomeAnchor = styled.div`
  position: absuolute;
  top: 0;
  width: 1px;
  height: 1px;
`
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
    top: 20px;
    left: 20px;
    z-index: 11;

    @media (min-width: ${props => props.theme.sm}) {
      top: 40px;
      left: 40px;
    }

    @media (min-width: ${props => props.theme.lg}) {
      top: 50px;
      left: 96px;
    }
  `
  return (
    <Layout>
      <SEO title="Home" />
      <GlobalStyle />
      <HomeAnchor id="home"></HomeAnchor>
      <Logo>
        <Img fixed={data.image.childImageSharp.fixed} />
      </Logo>
      <Header />
      <ProjectList />
      <Navbar />
    </Layout>
  )
}

export default IndexPage
