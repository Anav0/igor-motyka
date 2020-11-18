import styled from "styled-components"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Project from "src/components/project"

const BoxWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1400px;
`

export default () => {
  const projects = useStaticQuery(graphql`
    query ProjectsQuery{
      allStrapiProject(sort: { order: ASC, fields: id }) {
        nodes {
          desc
          title
          finishedDate
          id
          url
          stack
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
  `).allStrapiProject.nodes
  return (
    <BoxWrapper>
      {projects.map((project) => (
        <Project key={project.id} project={project}/>
      ))}
    </BoxWrapper>
  )
}
