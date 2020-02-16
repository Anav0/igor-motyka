import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Greeting from "../components/greeting"
import GlobalStyle from "src/styles/global"

const IndexPage = props => (
  <Layout>
    <GlobalStyle />
    <SEO title="Home" />
    <Greeting />
    <div style={{ height: 650 }}></div>
  </Layout>
)

export default IndexPage
