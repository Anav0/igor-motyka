import styled from "styled-components"
import React from "react"
import Project from "src/components/project"
import { projects } from "src/data/projects.js"
import { useStaticQuery, graphql } from "gatsby"

const BoxWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1400px;
`

export default () => {
  // TODO: not ideal to query here and in design-list.
  // Not an elegant solution
  const images = useStaticQuery(graphql`
    query ProjectImages {
      allFile {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `).allFile.edges
  let namesByImagedata = new Map()
  for (let i = 0; i < images.length; i++) {
    const element = images[i].node
    namesByImagedata.set(element.name, element.childImageSharp.gatsbyImageData)
  }
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
