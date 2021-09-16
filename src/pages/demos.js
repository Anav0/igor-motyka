import React from "react"
import Layout from "src/components/layout"
import Seo from "src/components/seo"
import { Demo, DemoImg, DemosList } from "src/styled-pages/demos.styled"
import { demos } from "src/data/demos.js"

const DemosPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Seo title="Demos" />

      <DemosList>
        {demos.map((demo) => (
          <Demo key={demo.id} href={demo.url} target="_blank" rel="noopener">
            <DemoImg src={`src/images/${demo.imageName}`} />
          </Demo>
        ))}
      </DemosList>
    </Layout>
  )
}

export default DemosPage
