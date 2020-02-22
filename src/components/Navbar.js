import React from "react"
import styled from "styled-components"
import scrollTo from "gatsby-plugin-smoothscroll"

const NavbarWrapper = styled.ul`
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;

  @media (min-width: ${props => props.theme.sm}) {
    top: 40px;
    right: 40px;
  }

  @media (min-width: ${props => props.theme.lg}) {
    top: 50px;
    right: 96px;
  }
`
const NavItem = styled.a`
  min-width: 100px;
  font-size: 1.25rem;
`
const navItems = [
  { text: "Home", anchor: "#home" },
  { text: "Projects", anchor: "#projects" },
  { text: "Career", anchor: "#projects" },
]

export default props => {
  return (
    <NavbarWrapper>
      {navItems.map(item => {
        return (
          <NavItem key={item.text} onClick={() => scrollTo(item.anchor)}>
            {item.text}
          </NavItem>
        )
      })}
    </NavbarWrapper>
  )
}
