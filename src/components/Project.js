import React, { useEffect } from "react"
import styled from "styled-components"
import { FaVuejs, FaSass, FaReact, FaPython } from "react-icons/fa"
import { IconContext } from "react-icons"
import { FiArrowUpRight } from "react-icons/fi"
import { TweenMax, TimelineMax, Power2, Power3, Power4 } from "gsap"
import * as ScrollMagic from "scrollmagic"
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)

const ProjectWrapper = styled.div`
  position: relative;
  margin: 4rem 0;
  width: 100%;
  @media (min-width: ${props => props.theme.sm}) {
    margin: 10rem 0;
  }
  img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease-in-out;
    object-fit: cover;
  }
  .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
`

const ProjectDesc = styled.div`
  h1 {
    display: none;
    font-size: 2rem;
  }
  p {
    position: absolute;
    top: -55px;
    left: 0;
  }
  .icon {
    display: none;
  }
  @media (min-width: ${props => props.theme.sm}) {
    .icon {
      display: block;
    }
    h1 {
      display: block;
    }
    p {
      position: initial;
      margin: 3rem 0;
      text-align: justify;
      line-height: 1.5;
      max-width: 400px;
    }
    background-color: black;
    padding: 3rem 4rem;
    position: absolute;
    right: -70px;
    bottom: -180px;
    width: 35rem;
  }

  @media (min-width: ${props => props.theme.lg}) {
    right: -20%;
    bottom: -10%;
    width: auto;
  }
  @media (min-width: ${props => props.theme.xl}) {
    right: 0%;
    bottom: -10%;
  }
`
const Stack = styled.ul`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  margin-top: 10px;
  @media (min-width: ${props => props.theme.sm}) {
    margin-top: 0;
  }
  .stack-header {
    margin-right: 1rem;
  }
`
const StackIcons = styled.ul`
  display: flex;
  align-items: center;

  * {
    margin: 0.5rem;
  }
`

const icons = {
  vue: key => <FaVuejs key={key} />,
  scss: key => <FaSass key={key} />,
  react: key => <FaReact key={key} />,
  python: key => <FaPython key={key} />,
}
const ImageOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0e1111;
  top: 0;
  left: 0;
`
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (min-width: ${props => props.theme.sm}) {
    height: 360px;
    width: 100%;
  }
  @media (min-width: ${props => props.theme.md}) {
    width: 100%;
    height: 480px;
  }
  @media (min-width: ${props => props.theme.lg}) {
    width: 1024px;
    height: 600px;
  }
`
export default props => {
  var projectWrapper = React.createRef()
  var projectImage = React.createRef()
  var projectDesc = React.createRef()
  useEffect(() => {
    let wrapper = projectWrapper.current
    let image = projectImage.current
    let desc = projectDesc.current
    let timeline = new TimelineMax()
    let controller = new ScrollMagic.Controller()
    timeline
      .fromTo(
        image,
        1.75,
        { skewX: 30, scale: 1.5 },
        { skewX: 0, xPercent: 150, ease: Power2.easeOut }
      )
      .fromTo(
        desc,
        0.5,
        { scale: 0, transformOrigin: "bottom right" },
        { scale: 1, ease: Power2.easeOut },
        "-=1.25"
      )

    new ScrollMagic.Scene({
      triggerElement: wrapper,
    })
      .setTween(timeline)
      .addTo(controller)

    function tilt(e) {
      const pageX = e.pageX ? e.pageX : e.touches[0].pageX
      const rotateX = pageX - window.innerWidth / 2
      TweenMax.to(wrapper, 0.5, {
        rotationY: 0.015 * rotateX,
        rotationX: Math.abs(0.015 * rotateX),
        rotationZ: "-0.1",
      })
    }
    wrapper.addEventListener("touchstart", tilt)
    wrapper.addEventListener("mousemove", tilt)
  }, [])
  return (
    <ProjectWrapper ref={projectWrapper}>
      <a target="_blank" rel="noreferrer noopener" href={props.project.url}>
        <ImageWrapper>
          <img
            src={`${process.env.GATSBY_API_URL}${props.project.Cover.url}`}
          ></img>
          <ImageOverlay ref={projectImage}></ImageOverlay>
        </ImageWrapper>
      </a>
      <ProjectDesc ref={projectDesc}>
        <h1>{props.project.Title}</h1>
        <p>{props.project.Desc}</p>
        <IconContext.Provider
          value={{
            size: "35px",
            style: { margin: "2rem" },
            className: "icon",
          }}
        >
          <a target="_blank" rel="noreferrer noopener" href={props.project.url}>
            <FiArrowUpRight />
          </a>
        </IconContext.Provider>
        <Stack>
          <h5 className="stack-header">Stack:</h5>
          <IconContext.Provider
            value={{
              size: "2rem",
            }}
          >
            <StackIcons>
              {props.project.stack.map(element => {
                if (icons[element])
                  return icons[element](props.project.id + element)
                else
                  return <span key={props.project.id + element}>{element}</span>
              })}
            </StackIcons>
          </IconContext.Provider>
        </Stack>
      </ProjectDesc>
    </ProjectWrapper>
  )
}
