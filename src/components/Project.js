import React from "react"
import styled from "styled-components"
import { FaVuejs, FaSass, FaReact, FaPython } from "react-icons/fa"
import { IconContext } from "react-icons"
import { FiArrowUpRight } from "react-icons/fi"

const ProjectWrapper = styled.div`
  position: relative;
  margin: 10rem 0;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease-in-out;
    object-fit: cover;
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
    right: -15%;
    bottom: -10%;
    position: absolute;
    right: -70px;
    bottom: -180px;
    width: 35rem;
  }

  @media (min-width: ${props => props.theme.lg}) {
    right: -15%;
    bottom: -10%;
    width: auto;
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

export default props => {
  return (
    <ProjectWrapper>
      <a target="_blank" rel="noreferrer noopener" href={props.project.url}>
        <img
          src={`${process.env.GATSBY_API_URL}${props.project.Cover.url}`}
        ></img>
      </a>
      <ProjectDesc>
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
