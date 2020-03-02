import React from "react"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import GlobalStyle from "src/styles/global"
import ProjectList from "src/components/projectList.js"
import Header from "src/components/Header.js"
import Navbar from "src/components/Navbar.js"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import DesignList from "src/components/designList"
import Career from "src/components/career"

const HomeAnchor = styled.div`
  position: absuolute;
  top: 0;
  width: 1px;
  height: 1px;
`
const IndexPage = props => {
  const data = useStaticQuery(graphql`
    query Images {
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
  const Logo = styled.div`
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 11;

    @media (min-width: ${props => props.theme.sm}) {
      top: 40px;
      left: 40px;
    }

    @media (min-width: ${props => props.theme.lg}) {
      top: 50px;
      left: 96px;
    }
  `

  const Section = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column: 1/5;
    width: 100%;
    @media (min-width: ${props => props.theme.sm}) {
      grid-column: 2/8;
      font-size: 7rem;
    }
    @media (min-width: ${props => props.theme.lg}) {
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
    @media (min-width: ${props => props.theme.sm}) {
      min-height: 100vh;
    }
  `
  const SectionHeader = styled.h1`
    font-family: "Bungee Hairline";
    font-size: 4.5rem;
    text-align: center;

    @media (min-width: ${props => props.theme.sm}) {
      padding: 0;
      font-size: 9rem;
    }
    @media (min-width: ${props => props.theme.lg}) {
      font-size: 18rem;
    }
  `
  return (
    <Layout>
      <SEO title="Home" />
      <GlobalStyle />
      <HomeAnchor id="home"></HomeAnchor>
      <Logo>
        <Img fixed={data.image.childImageSharp.fixed} />
      </Logo>
      <Navbar />
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
