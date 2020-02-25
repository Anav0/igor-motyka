import styled from "styled-components"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Project from "src/components/Project"

const BoxWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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
    <BoxWrapper>
      {projects.map(project => (
        <Project key={project.id} project={project}></Project>
      ))}
    </BoxWrapper>
  )
}
