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
  width: 100%;
  h1 {
    font-size: 4rem;
  }
  p {
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: lighter;
  }
  @media (min-width: ${props => props.theme.sm}) {
    h1 {
      font-size: 5rem;
    }
    p {
      margin-top: 4rem;
      font-size: 1.5rem;
      font-weight: lighter;
    }
  }
`
const Icons = styled.div`
  margin-top: 3rem;
  .icon {
    margin: 15px;
  }
  @media (min-width: ${props => props.theme.sm}) {
  }
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
