import styled from "styled-components"
import React from "react"
import Project from "src/components/project"
import { projects } from "src/data/projects.js"

const BoxWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1400px;
`

export default () => {
  return (
    <BoxWrapper>
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </BoxWrapper>
  )
}
