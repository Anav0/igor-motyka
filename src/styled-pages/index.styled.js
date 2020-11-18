import styled from "styled-components"

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column: 1/5;
    width: 100%;
    @media (min-width: ${(props) => props.theme.sm}) {
      grid-column: 2/8;
      font-size: 7rem;
    }
    @media (min-width: ${(props) => props.theme.lg}) {
      grid-column: 3/11;
      font-size: 12rem;
      width: 100%;
    }
  `

export const SectionHeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 50vh;
    @media (min-width: ${(props) => props.theme.sm}) {
      min-height: 100vh;
    }
  `
export const SectionHeader = styled.h1`
    font-family: "Bungee Hairline";
    font-size: 4.5rem;
    text-align: center;

    @media (min-width: ${(props) => props.theme.sm}) {
      padding: 0;
      font-size: 9rem;
    }
    @media (min-width: ${(props) => props.theme.lg}) {
      font-size: 18rem;
    }
  `