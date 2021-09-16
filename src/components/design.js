import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

const DesignWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    @media (min-width: ${(props) => props.theme.xl}) {
      height: 90%;
    }
    img {
      object-fit: contain !important;
    }
  }
`

export default class Design extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <DesignWrapper className="list-item-margin">
        <StaticImage src={`src/images/${props.design.imageName}`} />
      </DesignWrapper>
    )
  }
}
