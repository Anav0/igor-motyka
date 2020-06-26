import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/Seo"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import breakpoints from "../styles/breakpoints"

const ResumeLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  position: relative;
  grid-column: 1/5;
  padding: 10rem 0;
  @media (min-width: ${(props) => props.theme.sm}) {
    grid-column: 2/8;
    padding: 70px 60px;
    margin-top: 15rem;
  }

  @media (min-width: ${(props) => props.theme.mdx}) {
    grid-template-columns: auto 1fr;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    grid-column: 2/12;
    height: auto;
  }
`
const ResumeH1 = styled.h1``

const ResumeH2 = styled.h2`
  font-weight: normal;
  margin-bottom: 0.5rem;
`

const ResumeH3 = styled.h3`
  font-weight: normal;
  font-size: 1.45rem;
  margin-top: 2rem;
`

const ResumeImg = styled(Img)`
  filter: grayscale(75%);
  position: absolute;
  left: -10rem;
  top: -10rem;
  width: 20vw;
  min-width: 250px;
  max-height: 500px;
`

const ResumeDetails = styled.div`
  display: flex;
  flex-direction: column;
  place-self: start, center;
  margin-bottom: 4rem;
  @media (min-width: ${(props) => props.theme.sm}) {
    margin: 0;
  }
`

const ResumeContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
  grid-gap: 4rem;
  height: 100%;
  box-sizing: border-box;
  @media (min-width: ${(props) => props.theme.sm}) {
    padding-bottom: 6rem;
  }
  @media (min-width: ${(props) => props.theme.xl}) {
    grid-gap: 5rem;
    padding: 0;
  }
`

const ResumeSkills = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  place-self: center;
  @media (min-width: ${(props) => props.theme.mdx}) {
    justify-content: flex-start;
    place-self: center;
  }
`

const ResumeSkill = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  span {
    margin-left: 1rem;
  }
`

const SkillPercent = styled.div`
  border: 1px solid gray;
  width: 100%;
  height: 8px;
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    background-color: gray;
    width: 100%;
    height: 110%;
    transform: translateX(${(props) => `-${100 - props.percent}%`});
    position: absolute;
    left: 0;
    top: 0;
  }
`
const SkillHeader = styled.div`
  width: ${(props) => `${props.longestLength * 15}px`};
  font-size: 1.25rem;
`
const skills = [
  {
    header: "Programming Languages",
    skills: [
      { header: "Javascript", percent: 98 },
      { header: "Typescript", percent: 90 },
      { header: "Python", percent: 65 },
      { header: "C#", percent: 60 },
    ],
  },
  {
    header: "Tools",
    skills: [
      { header: "Figma", percent: 98 },
      { header: "Git", percent: 90 },
      { header: "Jira", percent: 80 },
      { header: "Antlr", percent: 25 },
    ],
  },
  {
    header: "Frameworks",
    skills: [
      { header: "Vue", percent: 98 },
      { header: "Nuxt", percent: 95 },
      { header: "React", percent: 90 },
      { header: "Gatsby", percent: 90 },
      { header: "Express.js", percent: 90 },
    ],
  },
  {
    header: "Libraries",
    skills: [
      { header: "Socket.io", percent: 98 },
      { header: "Gsap", percent: 75 },
      { header: "Three.js", percent: 45 },
    ],
  },
]

const ResumePage = ({ location }) => {
  const [longestWordlength, setLongestWordLength] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.addEventListener("resize", ({ target }) => {
      setWindowWidth(target.innerWidth)
    })
  }, [])

  const data = useStaticQuery(graphql`
    query ResumeQuery {
      image: file(relativePath: { eq: "face.jpg" }) {
        id
        childImageSharp {
          fluid(maxWidth: 450) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout location={location}>
      <Seo title="Resume" />
      <ResumeLayout className="acrylic">
        <ResumeDetails>
          {windowWidth >
          breakpoints.sm.substring(0, breakpoints.sm.length - 2) ? (
            <ResumeImg fluid={data.image.childImageSharp.fluid}></ResumeImg>
          ) : (
            ""
          )}
          <ResumeH1>Igor Motyka</ResumeH1>
          <ResumeH3>Katowice, Poland</ResumeH3>
        </ResumeDetails>
        <ResumeContent>
          {skills.map((skillSet) => {
            return (
              <ResumeSkills key={skillSet.header}>
                <ResumeH2>{skillSet.header}</ResumeH2>
                {skillSet.skills.map((skill) => {
                  if (skill.header.length > longestWordlength)
                    setLongestWordLength(skill.header.length)
                  return (
                    <ResumeSkill key={skill.header}>
                      <SkillHeader longestLength={longestWordlength}>
                        {skill.header}
                      </SkillHeader>
                      <SkillPercent percent={skill.percent}></SkillPercent>
                      <span>{skill.percent}%</span>
                    </ResumeSkill>
                  )
                })}
              </ResumeSkills>
            )
          })}
        </ResumeContent>
      </ResumeLayout>
    </Layout>
  )
}

export default ResumePage
