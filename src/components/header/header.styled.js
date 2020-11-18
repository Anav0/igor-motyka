import styled from "styled-components"

export const HeaderWrapper = styled.div`
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
export const Icons = styled.div`
  margin-top: 3rem;
  .icon {
    margin: 15px;
  }
`