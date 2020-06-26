import React, { useState, useEffect } from "react"
import styled from "styled-components"
import scrollTo from "gatsby-plugin-smoothscroll"
import { Link, navigate } from "gatsby"

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  z-index: 10;
  /* opacity: 0; */
  top: 20px;
  right: 20px;
  @media (min-width: ${(props) => props.theme.sm}) {
    top: 60px;
    right: 20px;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    top: 75px;
    right: 96px;
  }
`
const NavItem = styled.a`
  min-width: 100px;
  font-size: 1.25rem;
  position: relative;

  &:after {
    content: "";
    width: 0;
    height: 2px;
    position: absolute;
    bottom: -5px;
    left: 0;
    background-color: white;
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    &:after {
      width: 25%;
    }
  }
`

const NavLink = styled(Link)`
  min-width: 100px;
  font-size: 1.25rem;
  position: relative;
  text-decoration: none;

  &:after {
    content: "";
    width: 0;
    height: 2px;
    position: absolute;
    bottom: -5px;
    left: 0;
    background-color: white;
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    &:after {
      width: 25%;
    }
  }
`

const Hamburger = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
  margin-top: 15px;
  cursor: pointer;
  z-index: 10;
  &.hamburger-open {
    &:after {
      transform: scaleX(0.65);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 15px;
    width: 100%;
    height: 2px;
    background-color: white;
  }
  &:after {
    transition: transform 0.3s ease-in-out;
    transform-origin: top left;
    content: "";
    position: absolute;
    top: 0px;
    width: 100%;
    height: 2px;
    background-color: white;
  }
  @media (min-width: ${(props) => props.theme.sm}) {
    display: none;
  }
`
const NavbarItems = styled.ul`
  display: none;
  width: 100%;
  &:before {
    width: 48px;
    height: 48px;
    position: absolute;
    background-color: black;
    content: "";
    transition: transform 2s ease-in-out 1s;
  }
  &.items-shown {
    display: flex;
    position: fixed;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 60px 40px;
    text-align: center;
    align-items: center;
    height: 100%;
    left: 0;
    top: 0;

    * {
      font-size: 3rem;
      font-family: "Bungee Hairline";
      cursor: pointer;
    }
    &:before {
      width: 100%;
      height: 100%;
      transform: scale(100);
    }
  }
  @media (min-width: ${(props) => props.theme.sm}) {
    flex-direction: row;
    display: flex;
    &:before {
      content: none;
    }
  }
`

const navItems = [
  { text: "Home", anchor: "#home" },
  { text: "Projects", anchor: "#projects" },
  { text: "Designs", anchor: "#designs" },
  { text: "Career", anchor: "#career" },
  { text: "Resume", to: "/resume" },
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
      ></Hamburger>
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
