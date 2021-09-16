import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

export const DemosList = styled("ul")`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5rem;
  margin-top: 7rem;
  grid-column: 1/5;

  @media (min-width: ${(props) => props.theme.sm}) {
    grid-template-columns: 1fr 1fr;
    grid-column: 2/8;
    margin-top: 15rem;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    grid-column: 2/12;
    grid-template-columns: 1fr 1fr 1fr;
    height: auto;
  }
`
export const Demo = styled("a")``

export const DemoImg = styled(GatsbyImage)`
  object-cover: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`
export const DemoCloseBtn = styled("button")`
  position: absolute;
  top: 10%;
  right: 5%;
  z-index: 11;
`

export const EmbeddedWeb = styled("iframe")`
  position: fixed;
  width: 95vw;
  height: 95vh;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
