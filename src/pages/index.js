import React from "react"
import Layout from "src/components/layout"
import Seo from "src/components/seo"
import ProjectList from "src/components/projects-list.js"
import DesignList from "src/components/design-list"
import Demos from "src/components/demos-list"
import Career from "src/components/career"
import Header from "src/components/header"
import {
  Section,
  SectionHeader,
  SectionHeaderWrapper,
} from "src/styled/index.styled"
import { useStaticQuery, graphql } from "gatsby"
import { myProjects } from "../data/my-projects"
import { workProjects } from "../data/work-projects"

const IndexPage = ({ location }) => {
  // TODO: not ideal to query all images
  const images = useStaticQuery(graphql`
    query ProjectImages {
      allFile {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `).allFile.edges
  let namesByImagedata = new Map()
  for (let i = 0; i < images.length; i++) {
    const element = images[i].node
    console.log(element)
    namesByImagedata.set(element.name, element.childImageSharp.gatsbyImageData)
  }
  return (
    <Layout location={location}>
      <Seo title="Home" />
      <Header />
      <Section className="firstSection">
        <SectionHeaderWrapper id="workProjects">
          <SectionHeader>Work projects</SectionHeader>
        </SectionHeaderWrapper>
        <ProjectList
          projects={workProjects}
          namesByImagedata={namesByImagedata}
        />
      </Section>
      <Section>
        <SectionHeaderWrapper id="myProjects">
          <SectionHeader>My projects</SectionHeader>
        </SectionHeaderWrapper>
        <ProjectList
          projects={myProjects}
          namesByImagedata={namesByImagedata}
        />
      </Section>
      <Section>
        <SectionHeaderWrapper id="designs">
          <SectionHeader>designs</SectionHeader>
        </SectionHeaderWrapper>
        <DesignList namesByImagedata={namesByImagedata} />
      </Section>
      <Section>
        <SectionHeaderWrapper id="demos">
          <SectionHeader>demos</SectionHeader>
        </SectionHeaderWrapper>
        <Demos namesByImagedata={namesByImagedata} />
      </Section>
    </Layout>
  )
}

export default IndexPage
