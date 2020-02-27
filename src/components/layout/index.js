import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import WebGlBackground from "src/components/WebGlBackground"
import breakpoints from "src/styles/breakpoints"

const MyGrid = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 16px;
  margin: 10px 10px;
  @media (min-width: ${props => props.theme.sm}) {
    margin: 0;
    grid-template-columns: repeat(8, 1fr);
    grid-column-gap: 24px;
  }

  @media (min-width: ${props => props.theme.lg}) {
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 32px;
  }
`
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={breakpoints}>
      <MyGrid>
        {children}
        <WebGlBackground />
      </MyGrid>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
