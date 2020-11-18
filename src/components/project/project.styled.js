import styled from "styled-components"

export const ImageOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0e1111;
  top: 0;
  left: 0;
`
export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    width: 100%;
    height: 360px;
  }
  @media (min-width: ${(props) => props.theme.md}) {
    width: 100%;
    height: 480px;
  }
  @media (min-width: ${(props) => props.theme.lg}) {
    width: 1024px;
    height: 600px;
  }
`
export const ProjectWrapper = styled.div`
  position: relative;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease-in-out;
    object-fit: cover;
  }
  .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
`

export const ProjectDesc = styled.div`
  min-width: 350px;
  min-height: 225px;
  h1 {
    display: none;
    font-size: 2rem;
  }
  p {
    margin-top: 1rem;
    @media (min-width: ${(props) => props.theme.sm}) {
      margin: 0;
    }
  }
  .icon {
    display: none;
  }
  @media (min-width: ${(props) => props.theme.sm}) {
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
    position: absolute;
    right: -70px;
    bottom: -100px;
    width: 35rem;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    right: -20%;
    bottom: -10%;
    width: auto;
    min-width: 450px;
  }
  @media (min-width: ${(props) => props.theme.xl}) {
    right: 0rem;
    bottom: -10%;
  }
`
export const Stack = styled.ul`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  margin-top: 10px;
  @media (min-width: ${(props) => props.theme.sm}) {
    margin-top: 0;
  }
  .stack-header {
    margin-right: 1rem;
  }
`
export const StackIcons = styled.ul`
  display: flex;
  align-items: center;

  * {
    margin: 0.5rem;
  }
  `