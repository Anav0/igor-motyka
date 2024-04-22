import React, { useEffect } from "react"
import { TweenMax, TimelineMax, Power2 } from "gsap"
import * as ScrollMagic from "scrollmagic"
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

const icons = {
  vue: (key) => <span key={key} >Vue</span>,
  scss: (key) => <span key={key} >Scss</span>,
  react: (key) => <span key={key} >React</span>,
  python: (key) => <span key={key} >Python</span>,
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
          <a target="_blank" rel="noreferrer noopener" href={project.url}>
            <span>ICON</span>
          </a>
        
        <Stack>
          <h5 className="stack-header">Stack:</h5>
            <StackIcons>
              {project.stack.map((element) => {
                if (icons[element])
                  return icons[element](project.id + element)
                else
                  return <span key={project.id + element}>{element}</span>
              })}
            </StackIcons>
        </Stack>
      </ProjectDesc>
    </ProjectWrapper>
  )
}
