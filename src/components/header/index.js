import React from "react"
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
          <Icons>
            <a href="mailto:igor_motyka@mail.com">
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/Anav0"
            >
            </a>{" "}
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/%E1%9B%9D-igor-m-873439168/"
            >
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.behance.net/igoranawski"
            >
              <span>Behance</span>
            </a>
          </Icons>
      </HeaderWrapper>
    )
  }
}
