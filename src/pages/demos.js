import React, { useEffect, useState } from "react"
import Layout from "src/components/layout"
import Seo from "src/components/seo"
import { graphql, useStaticQuery } from "gatsby"
import { Demo, DemoCloseBtn, DemoImg, DemosList, EmbeddedWeb } from "src/styled/demos.styled"

const DemosPage = ({ location }) => {
  const [loadedUrl, setLoadedUrl] = useState("")

  useEffect(() => {
    console.log(loadedUrl)
  }, [loadedUrl])

  const demos = useStaticQuery(graphql`
      query {
          allStrapiDemo {
              edges {
                  node {
                      id,
                      name,
                      url,
                      cover {
                          id
                          prettySize
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
      {/*{*/}
      {/*  loadedUrl.length > 0 ? (<EmbeddedWeb src={loadedUrl} />) : ("")*/}
      {/*}*/}
      {/*{*/}
      {/*  loadedUrl.length > 0 ? (<DemoCloseBtn onClick={() => setLoadedUrl("")}>CLOSE</DemoCloseBtn>) : ("")*/}
      {/*}*/}
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
