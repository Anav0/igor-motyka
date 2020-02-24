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
          fluid {
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
  const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column: 1/5;
    margin-top: 100vh;
    width: 100%;
    @media (min-width: ${props => props.theme.sm}) {
      grid-column: 2/8;
      font-size: 7rem;
      margin-top: 125vh;
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
    height: 50vh;

    @media (min-width: ${props => props.theme.sm}) {
      height: 120vh;
    }
  `
  const SectionHeader = styled.h1`
    font-family: "Bungee Hairline";
    font-size: 4rem;
    text-align: center;
    width: 100%;

    @media (min-width: ${props => props.theme.sm}) {
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
      <ContentWrapper>
        <SectionHeaderWrapper>
          <SectionHeader id="projects">projects</SectionHeader>
        </SectionHeaderWrapper>
        <ProjectList />
        <SectionHeaderWrapper>
          <SectionHeader id="career">career</SectionHeader>
        </SectionHeaderWrapper>
      </ContentWrapper>
    </Layout>
  )
}

export default IndexPage
