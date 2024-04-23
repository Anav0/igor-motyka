import React, { useState, useEffect } from "react"
import scrollTo from "gatsby-plugin-smoothscroll"
import { Link, navigate } from "gatsby"
import {
  Hamburger,
  NavbarItems,
  NavbarWrapper,
  NavItem,
  NavLink,
} from "./navbar.styled"

const navItems = [
  { text: "Home", anchor: "#home" },
  { text: "Work", anchor: "#workProjects" },
  { text: "Hobby", anchor: "#myProjects" },
  { text: "Designs", anchor: "#designs" },
  { text: "Demos", to: "#demos" },
]

export default ({ location }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])
  const onClick = (item) => {
    if (location.pathname === "/") {
      setIsOpen(false)
      scrollTo(item.anchor)
    } else {
      navigate(`/${item.anchor}`)
    }
  }
  return (
    <NavbarWrapper
      className={(isVisible ? "appear" : "", isOpen ? "is-open" : "")}
    >
      <Hamburger
        className={isOpen ? "hamburger-open" : ""}
        onClick={() => setIsOpen(!isOpen)}
      />
      <NavbarItems className={isOpen ? "items-shown" : ""}>
        {navItems.map((item) => {
          if (item.to)
            return (
              <NavLink to={item.to} key={item.text}>
                {item.text}
              </NavLink>
            )
          else
            return (
              <NavItem onClick={() => onClick(item)} key={item.text}>
                {item.text}
              </NavItem>
            )
        })}
      </NavbarItems>
    </NavbarWrapper>
  )
}
