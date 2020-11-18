import React from "react"
import Layout from "src/components/layout"
import Seo from "src/components/seo"
import ProjectList from "src/components/projects-list.js"
import Index from "src/components/header"
import DesignList from "src/components/design-list"
import Career from "src/components/career"
import { Section, SectionHeader, SectionHeaderWrapper } from "src/styled-pages/index.styled"

const IndexPage = ({ location }) => {

  return (
    <Layout location={location}>
      <Seo title="Home" />
      <Index />
      <Section className="firstSection">
        <SectionHeaderWrapper id="projects">
          <SectionHeader>projects</SectionHeader>
        </SectionHeaderWrapper>
        <ProjectList />
        <SectionHeaderWrapper id="designs">
          <SectionHeader>designs</SectionHeader>
        </SectionHeaderWrapper>
      </Section>
      <DesignList />
      <Section>
        <SectionHeaderWrapper id="career">
          <SectionHeader>career</SectionHeader>
        </SectionHeaderWrapper>
        <Career />
      </Section>
    </Layout>
  )
}

export default IndexPage
