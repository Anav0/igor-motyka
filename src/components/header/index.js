import React from "react"
import { FaRegEnvelope, FaGithub, FaBehance, FaLinkedin } from "react-icons/fa"
import { IconContext } from "react-icons"
import { HeaderWrapper, Icons } from "./header.styled"

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <HeaderWrapper>
        <h1>Igor Motyka</h1>
        <p>Fullstack developer</p>
        <IconContext.Provider
          value={{
            size: "35px",
            className: "icon",
          }}
        >
          <Icons>
            <a href="mailto:igor_motyka@mail.com">
              <FaRegEnvelope />
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/Anav0"
            >
              <FaGithub />
            </a>{" "}
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/%E1%9B%9D-igor-m-873439168/"
            >
              <FaLinkedin />
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.behance.net/igoranawski"
            >
              <FaBehance />
            </a>
          </Icons>
        </IconContext.Provider>
      </HeaderWrapper>
    )
  }
}
