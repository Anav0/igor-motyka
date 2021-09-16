import React, { useEffect } from "react"
import { TweenMax, TimelineMax, Power2 } from "gsap"
import * as ScrollMagic from "scrollmagic"
import { IconContext } from "react-icons"
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import {
  ImageOverlay,
  ImageWrapper,
  ProjectDesc,
  ProjectWrapper,
  Stack,
  StackIcons,
} from "./project.styled"
import {
  FaPython,
  FaReact,
  FaSass,
  FaVuejs,
  FiArrowUpRight,
} from "react-icons/all"

const icons = {
  vue: (key) => <FaVuejs key={key} />,
  scss: (key) => <FaSass key={key} />,
  react: (key) => <FaReact key={key} />,
  python: (key) => <FaPython key={key} />,
}

export default ({ project, image }) => {
  var projectWrapper = React.createRef()
  var projectImage = React.createRef()
  var projectDesc = React.createRef()
  useEffect(() => {
    console.log(window.innerWidth)
    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)

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
    <ProjectWrapper className="list-item-margin" ref={projectWrapper}>
      <a target="_blank" rel="noreferrer noopener" href={project.url}>
        <ImageWrapper>
          <GatsbyImage alt="" image={image} />
          <ImageOverlay ref={projectImage} />
        </ImageWrapper>
      </a>
      <ProjectDesc ref={projectDesc}>
        <h1>{project.title}</h1>
        <p>{project.desc}</p>
        <IconContext.Provider
          value={{
            size: "35px",
            style: { margin: "24px" },
            className: "icon",
          }}
        >
          <a target="_blank" rel="noreferrer noopener" href={project.url}>
            <FiArrowUpRight />
          </a>
        </IconContext.Provider>
        <Stack>
          <h5 className="stack-header">Stack:</h5>
          <IconContext.Provider
            value={{
              size: "24px",
            }}
          >
            <StackIcons>
              {project.stack.map((element) => {
                if (icons[element])
                  return icons[element](project.id + element)
                else
                  return <span key={project.id + element}>{element}</span>
              })}
            </StackIcons>
          </IconContext.Provider>
        </Stack>
      </ProjectDesc>
    </ProjectWrapper>
  )
}
