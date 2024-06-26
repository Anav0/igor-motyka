import React from "react"
import styled from "styled-components"
import Design from "src/components/design"
import { designs } from "src/data/designs.js"

const DesignWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-column: 1/5;
  width: 100%;
  @media (min-width: ${(props) => props.theme.sm}) {
    grid-column: 2/8;
    font-size: 7rem;
  }
  @media (min-width: ${(props) => props.theme.lg}) {
    grid-column: 2/12;
    font-size: 12rem;
    width: 100%;
  }
`

export default ({ namesByImagedata }) => {
  let id = 0;
  return (
    <DesignWrapper>
      {designs.map((design) => {
        id+=1;
        return (
        <Design
          key={`${design}-${id}`}
          design={design}
          image={namesByImagedata.get(design.imageName)}
        ></Design>
        
      )})}
    </DesignWrapper>
  )
}
