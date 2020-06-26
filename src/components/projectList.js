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

export default (props) => {
  const projects = useStaticQuery(graphql`
    query {
      allStrapiProject(sort: { order: ASC, fields: id }) {
        nodes {
          Desc
          Title
          finishedDate
          id
          url
          stack
          Cover {
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
        <Project key={project.id} project={project}></Project>
      ))}
    </BoxWrapper>
  )
}
