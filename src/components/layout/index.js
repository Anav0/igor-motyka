import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import WebGlBackground from "src/components/web-gl-background"
import breakpoints from "src/styles/breakpoints"
import Seo from "src/components/seo"
import Navbar from "src/components/navbar"
import Img from "gatsby-image"
import GlobalStyle from "src/styles/global"

const HomeAnchor = styled.div`
  position: absolute;
  top: 0;
  width: 1px;
  height: 1px;
`

const Logo = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 11;

  @media (min-width: ${(props) => props.theme.sm}) {
    top: 40px;
    left: 40px;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    top: 50px;
    left: 96px;
  }
`

const MyGrid = styled.div`
  ${(props) => (props.hide ? "overflow: hidden" : "overflow: auto")};
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 16px;
  margin: 10px 10px;
  @media (min-width: ${(props) => props.theme.sm}) {
    margin: 0;
    grid-template-columns: repeat(8, 1fr);
    grid-column-gap: 24px;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 32px;
  }
`
const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      image: file(relativePath: { eq: "icon-no-background.png" }) {
        id
        childImageSharp {
          fixed(width: 48) {
            ...GatsbyImageSharpFixed
          }
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={breakpoints}>
      <Seo
        title="Home"
        keywords={[
          "protfolio",
          "freelancer",
          "web dev",
          "frontend",
          "fullstack",
          "backend",
          "vue",
          "react",
          "gatsby",
          "nuxt",
          "scss",
          "html",
        ]}
      />
      <MyGrid hide={location.pathname !== "/resume"}>
        <GlobalStyle />
        <HomeAnchor id="home"></HomeAnchor>
        <Logo>
          <Img fixed={data.image.childImageSharp.fixed} />
        </Logo>
        <Navbar location={location} />
        {children}
        <WebGlBackground location={location} />
      </MyGrid>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
