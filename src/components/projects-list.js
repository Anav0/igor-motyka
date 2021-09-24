import styled from "styled-components"
import React from "react"
import Project from "src/components/project"
import { useStaticQuery, graphql } from "gatsby"

const BoxWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1400px;
`

export default ({ namesByImagedata, projects }) => {
  return (
    <BoxWrapper>
      {projects.map((project) => (
        <Project
          key={project.id}
          project={project}
          image={namesByImagedata.get(project.imageName)}
        />
      ))}
    </BoxWrapper>
  )
}
