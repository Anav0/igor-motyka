import React, { useState, useEffect } from "react"
import Layout from "src/components/layout"
import Seo from "src/components/seo"
import { useStaticQuery, graphql } from "gatsby"
import breakpoints from "src/styles/breakpoints"
import {
  ResumeContent,
  ResumeDetails,
  ResumeH1, ResumeH2,
  ResumeH3,
  ResumeImg,
  ResumeLayout, ResumeSkill,
  ResumeSkills, SkillHeader, SkillPercent,
} from "src/styled-pages/resume.styled"
import { skills } from "src/data/skills"

const ResumePage = ({ location }) => {
  const [longestWordlength, setLongestWordLength] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.addEventListener("resize", ({ target }) => {
      setWindowWidth(target.innerWidth)
    })
  }, [])

  const data = useStaticQuery(graphql`query ResumeQuery {
  image: file(relativePath: {eq: "face.jpg"}) {
    id
    childImageSharp {
      gatsbyImageData(width: 450, layout: CONSTRAINED)
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
            <ResumeImg fluid={data.image.childImageSharp.gatsbyImageData}></ResumeImg>
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
  );
}

export default ResumePage
