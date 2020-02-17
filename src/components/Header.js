import React from "react"
import styled from "styled-components"
import { FaRegEnvelope, FaGithub, FaBehance } from "react-icons/fa"
import { IconContext } from "react-icons"

const HeaderWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 55vh;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 0;

  p {
    margin-top: 10rem;
    font-size: 1.25rem;
    font-weight: lighter;
  }
`
const Icons = styled.div`
  margin-top: 3rem;
`
export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isVisible: false }
  }
  componentDidMount() {
    this.setState({
      isVisible: true,
    })
  }
  render() {
    return (
      <HeaderWrapper className={this.state.isVisible ? "appear" : ""}>
        <h1>Igor Motyka</h1>

        <p>
          Check my projects and tech stack below ranging from WebGl and Vue to
          Python
        </p>
        <IconContext.Provider
          value={{
            size: "35px",
            style: { margin: "2rem" },
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
