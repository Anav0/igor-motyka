import styled from "styled-components"
import React from "react"

const Box = styled.div`
  width: 250px;
  height: 250px;
  background-color: ${props => `hsl(${props.number * 5}, 50%, 50%)`};
`
const BoxWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 10%;
  margin-top: 150vh;
  justify-content: center;
`
export default props => (
  <BoxWrapper>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
      <Box key={value} number={value}></Box>
    ))}
  </BoxWrapper>
)
