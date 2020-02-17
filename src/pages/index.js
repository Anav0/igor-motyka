import React from "react"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import GlobalStyle from "src/styles/global"
import styled from "styled-components"
import ProjectList from "src/components/projectList.js"
import Header from "src/components/Header.js"

const Percentage = styled.span`
  font-size: 24px;
  position: absolute;
  left: 50%;
  top: 50%;
  color: white;
  z-index: 1;
`

const IndexPage = props => (
  <Layout>
    <SEO title="Home" />
    <GlobalStyle />
    <Header />
    <ProjectList />
  </Layout>
)

export default IndexPage
