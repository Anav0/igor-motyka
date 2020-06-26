import React from "react"
import Layout from "src/components/layout"
import Seo from "src/components/Seo"
import ProjectList from "src/components/projectList.js"
import Header from "src/components/Header.js"
import styled from "styled-components"
import DesignList from "src/components/designList"
import Career from "src/components/career"

const IndexPage = ({ location }) => {
  const Section = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column: 1/5;
    width: 100%;
    @media (min-width: ${(props) => props.theme.sm}) {
      grid-column: 2/8;
      font-size: 7rem;
    }
    @media (min-width: ${(props) => props.theme.lg}) {
      grid-column: 3/11;
      font-size: 12rem;
      width: 100%;
    }
  `

  const SectionHeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 50vh;
    @media (min-width: ${(props) => props.theme.sm}) {
      min-height: 100vh;
    }
  `
  const SectionHeader = styled.h1`
    font-family: "Bungee Hairline";
    font-size: 4.5rem;
    text-align: center;

    @media (min-width: ${(props) => props.theme.sm}) {
      padding: 0;
      font-size: 9rem;
    }
    @media (min-width: ${(props) => props.theme.lg}) {
      font-size: 18rem;
    }
  `
  return (
    <Layout location={location}>
      <Seo title="Home" />
      <Header />
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
