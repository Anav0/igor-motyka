import React from "react"
import styled from "styled-components"
import Flickity from "react-flickity-component"
import { graphql, useStaticQuery } from "gatsby"

const flickityOptions = {
  prevNextButtons: false,
  pageDots: false,
  freeScroll: true,
  reloadOnUpdate: true,
}

const CareerWrapper = styled.div`
  width: 100%;
  min-height: 75vh;
`

const CareerStepWrapper = styled.div`
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

const CareerStep = styled.div`
  width: 100%;
  @media (min-width: ${(props) => props.theme.sm}) {
    width: 75%;
  }
  @media (min-width: ${(props) => props.theme.lg}) {
    width: 65%;
  }
`

const CareerStepHeader = styled.a`
  font-size: 3rem;
  display: block;
  margin-bottom: 4rem;
  @media (min-width: ${(props) => props.theme.sm}) {
    font-size: 5rem;
  }
`

const CareerStepDesc = styled.p`
  font-size: 1.5rem;
  text-align: justify;
  font-weight: lighter;
  line-height: 1.5;
  @media (min-width: ${(props) => props.theme.sm}) {
    font-size: 1.75rem;
  }
`
const CareerStepDate = styled.span`
  display: block;
  font-weight: lighter;
  font-size: 1.25rem;
  margin-bottom: 4rem;
  @media (min-width: ${(props) => props.theme.sm}) {
    font-size: 1.75rem;
  }
`

function calculateDate(startDate, endDate) {
  if (!endDate)
    return new Date(startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })

  return `${new Date(startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })} -
    ${new Date(endDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })}`
}
export default (props) => {
  const careers = useStaticQuery(graphql`
    query CareersQuery {
      allStrapiCareer(sort: { order: DESC, fields: startDate }) {
        nodes {
          id
          title
          startDate
          desc
          endDate
          companyLink
          createdAt
        }
      }
    }
  `).allStrapiCareer.nodes

  return (
    <CareerWrapper>
      <Flickity
        className={"carousel"}
        elementType={"div"}
        options={flickityOptions}
      >
        {careers.map((step) => (
          <CareerStepWrapper key={step.title}>
            <CareerStep>
              <CareerStepDate>
                {calculateDate(step.startDate, step.endDate)}
              </CareerStepDate>
              <CareerStepHeader
                target="_blank"
                rel="noreferrer noopener"
                href={step.companyLink}
              >
                {step.title}
              </CareerStepHeader>
              <CareerStepDesc>{step.desc}</CareerStepDesc>
            </CareerStep>
          </CareerStepWrapper>
        ))}
      </Flickity>
    </CareerWrapper>
  )
}
