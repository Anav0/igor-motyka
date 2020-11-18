import styled from "styled-components"

export const CareerWrapper = styled.div`
  width: 100%;
  min-height: 75vh;
`

export const CareerStepWrapper = styled.div`
  width: 100%;
  margin: 0 5rem;
  padding: 10px;
  opacity: 0.25;
  transition: all 1s ease-in-out;

  &.is-selected {
    opacity: 1;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    width: 90%;
    margin: 0;
    padding: 0;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    width: 70%;
  }

  @media (min-width: ${(props) => props.theme.xl}) {
    width: 60%;
  }
`

export const CareerStep = styled.div`
  width: 100%;
  @media (min-width: ${(props) => props.theme.sm}) {
    width: 75%;
  }
  @media (min-width: ${(props) => props.theme.lg}) {
    width: 65%;
  }
`

export const CareerStepHeader = styled.a`
  font-size: 3rem;
  display: block;
  margin-bottom: 4rem;
  @media (min-width: ${(props) => props.theme.sm}) {
    font-size: 5rem;
  }
`

export const CareerStepDesc = styled.p`
  font-size: 1.5rem;
  text-align: justify;
  font-weight: lighter;
  line-height: 1.5;
  @media (min-width: ${(props) => props.theme.sm}) {
    font-size: 1.75rem;
  }
`
export const CareerStepDate = styled.span`
  display: block;
  font-weight: lighter;
  font-size: 1.25rem;
  margin-bottom: 4rem;
  @media (min-width: ${(props) => props.theme.sm}) {
    font-size: 1.75rem;
  }
`