import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import Design from "src/components/design"

const DesignWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default props => {
  const { designs } = useStaticQuery(graphql`
    query {
      cms {
        designs(sort: "id") {
          id
          alt
          image {
            id
            name
            size
            url
          }
        }
      }
    }
  `).cms

  return (
    <DesignWrapper>
      {designs.map(design => (
        <Design key={design.id} design={design}></Design>
      ))}
    </DesignWrapper>
  )
}
