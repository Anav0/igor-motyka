import styled from "styled-components"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Project from "src/components/project"

const BoxWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 200vh;
  justify-content: center;
  align-items: center;
  grid-column: 1/4;

  @media (min-width: ${props => props.theme.sm}) {
    grid-column: 1/4;
    color: red;
  }

  @media (min-width: ${props => props.theme.lg}) {
    grid-column: 3/10;
  }
`

export default props => {
  const { projects } = useStaticQuery(graphql`
    query {
      cms {
        projects(sort: "id") {
          Title
          created_at
          finishedDate
          id
          url
          stack
          Desc
          Cover {
            size
            url
            name
          }
        }
      }
    }
  `).cms

  return (
    <BoxWrapper id="projects">
      {projects.map(project => (
        <Project key={project.id} project={project}></Project>
      ))}
    </BoxWrapper>
  )
}
