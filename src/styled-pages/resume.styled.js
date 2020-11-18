import styled from "styled-components"
import Img from "gatsby-image"

export const ResumeLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  position: relative;
  grid-column: 1/5;
  padding: 10rem 0;
  @media (min-width: ${(props) => props.theme.sm}) {
    grid-column: 2/8;
    padding: 70px 60px;
    margin-top: 15rem;
    background: rgba(0, 0, 0, 0.5);
  }

  @media (min-width: ${(props) => props.theme.mdx}) {
    grid-template-columns: auto 1fr;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    grid-column: 2/12;
    height: auto;
  }
`
export const ResumeH1 = styled.h1``

export const ResumeH2 = styled.h2`
  font-weight: normal;
  margin-bottom: 0.5rem;
`

export const ResumeH3 = styled.h3`
  font-weight: normal;
  font-size: 1.45rem;
  margin-top: 2rem;
`

export const ResumeImg = styled(Img)`
  filter: grayscale(75%);
  position: absolute;
  left: -10rem;
  top: -10rem;
  width: 20vw;
  min-width: 250px;
  max-height: 500px;
`

export const ResumeDetails = styled.div`
  display: flex;
  flex-direction: column;
  place-self: start, center;
  margin-bottom: 4rem;
  @media (min-width: ${(props) => props.theme.sm}) {
    margin: 0;
  }
`

export const ResumeContent = styled.div`
  display: grid;
  grid-gap: 4rem;
  height: 100%;
  box-sizing: border-box;
  @media (min-width: ${(props) => props.theme.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
    padding-bottom: 6rem;
  }
  @media (min-width: ${(props) => props.theme.xl}) {
    grid-gap: 5rem;
    padding: 0;
  }
`

export const ResumeSkills = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  place-self: center;
  @media (min-width: ${(props) => props.theme.mdx}) {
    justify-content: flex-start;
    place-self: center;
  }
`

export const ResumeSkill = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  span {
    margin-left: 1rem;
  }
`

export const SkillPercent = styled.div`
  border: 1px solid gray;
  width: 100%;
  height: 8px;
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    background-color: gray;
    width: 100%;
    height: 110%;
    transform: translateX(${(props) => `-${100 - props.percent}%`});
    position: absolute;
    left: 0;
    top: 0;
  }
`
export const SkillHeader = styled.div`
  width: ${(props) => `${props.longestLength * 15}px`};
  font-size: 1.25rem;
`