import React from "react"
import Layout from "src/components/layout"
import Seo from "src/components/seo"
import { graphql, useStaticQuery } from "gatsby"
import { Demo, DemoImg, DemosList } from "src/styled-pages/demos.styled"

const DemosPage = ({ location }) => {
  const demos = useStaticQuery(graphql`
      query DemoQuery {
          allStrapiDemo {
              edges {
                  node {
                      id,
                      url,
                      cover {
                          childImageSharp {
                              fluid {
                                  ...GatsbyImageSharpFluid
                              }
                          }
                      }
                  }
              }
          }
      }
  `).allStrapiDemo.edges

  return (
    <Layout location={location}>
      <Seo title="Demos" />

      <DemosList>
        {demos.map(x =>
          <Demo key={x.node.id} href={x.node.url} target="_blank" rel="noopener">
            <DemoImg fluid={x.node.cover.childImageSharp.fluid} />
          </Demo>,
        )}
      </DemosList>
    </Layout>
  )
}


export default DemosPage
