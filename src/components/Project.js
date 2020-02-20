import React from "react"
import styled from "styled-components"
import { FaVuejs, FaSass, FaReact, FaPython } from "react-icons/fa"
import { IconContext } from "react-icons"
import { FiArrowUpRight } from "react-icons/fi"

const ProjectDesc = styled.div`
  background-color: black;
  padding: 30px 50px;
  position: absolute;
  right: -15%;
  bottom: -10%;
  p {
    max-width: 400px;
    margin: 3rem 0;
    line-height: 1.5;
    text-align: justify;
  }
`
const Stack = styled.ul`
  display: flex;
  align-items: center;
  text-transform: capitalize;
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
const ProjectWrapper = styled.div`
  position: relative;
  margin: 10rem;
  img {
    max-width: 1024px;
    transition: transform 0.3s ease-in-out;
  }
  .icon {
    position: absolute;
    right: 0;
    top: 0;
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
