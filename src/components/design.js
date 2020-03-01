import React from "react"
import styled from "styled-components"
import { TweenMax, TimelineMax, Power4 } from "gsap"
import * as ScrollMagic from "scrollmagic"
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)

const DesignWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

const Bubble = styled.div`
  border-radius: 50%;
  position: absolute;
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
  background-color: #0e1111;
  width: ${props => (props.size ? props.size : "15px")};
  height: ${props => (props.size ? props.size : "15px")};
`

const DesignImage = styled.img`
  width: 100%;
  height: 100%;
`

function generateBubbles(design) {
  const bubbleSize = 150
  const bubbleArea = Math.round(Math.PI * Math.pow(bubbleSize / 2, 2))
  let row = 0
  let column = 0
  let bubbles = []

  const dim = design.getBoundingClientRect()
  //TODO: change this later. Tmp solution cuz above method returnes 0 for height and i don't know why :c
  const tmpHeight = dim.width * 0.3
  const area = Math.round(dim.width * tmpHeight)
  const numberOfBubbles = Math.round(area / bubbleArea)

  for (let i = 0; i < numberOfBubbles; i++) {
    let random = i & 2 ? Math.random() * 150 : -Math.random() * 20
    let left = column * bubbleSize + random
    let top = row * bubbleSize + random
    if (left > dim.width && i != 0) {
      column = 0
      left = column * bubbleSize + random
      top = row * bubbleSize + random
      row++
    }

    bubbles.push(
      <Bubble
        className="design-bubble"
        key={"bubble" + i}
        size={`${bubbleSize}px`}
        left={left}
        top={top}
      />
    )
    column++
  }
  return bubbles
}

export default class Design extends React.Component {
  constructor(props) {
    super(props)
    this.designWrapper = React.createRef()
    this.state = { bubbles: [] }
  }

  async componentDidMount() {
    let design = this.designWrapper.current

    await this.setState({
      bubbles: generateBubbles(design),
    })
    let bubbles = Array.from(design.children).filter(child =>
      child.classList.contains("design-bubble")
    )
    let timeline = new TimelineMax()
    let controller = new ScrollMagic.Controller()

    timeline.fromTo(
      bubbles,
      2,
      { scale: 10 },
      { scale: 0, ease: Power4.easeInOut }
    )

    new ScrollMagic.Scene({
      triggerElement: design,
    })
      .setTween(timeline)
      .addTo(controller)
  }

  render() {
    return (
      <DesignWrapper ref={this.designWrapper} className="list-item-margin">
        {this.state.bubbles}
        <DesignImage
          src={`${process.env.GATSBY_API_URL}${this.props.design.image.url}`}
          alt={this.props.design.alt}
        ></DesignImage>
      </DesignWrapper>
    )
  }
}
