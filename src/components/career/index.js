import React from "react"
import Flickity from "react-flickity-component"
import { graphql, useStaticQuery } from "gatsby"
import {
  CareerStep,
  CareerStepDate,
  CareerStepDesc,
  CareerStepHeader,
  CareerStepWrapper,
  CareerWrapper,
} from "./career.styled"

const flickityOptions = {
  prevNextButtons: false,
  pageDots: false,
  freeScroll: true,
  reloadOnUpdate: true,
}


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
          Title
          StartDate
          Desc
          EndDate
          CompanyLink
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
          <CareerStepWrapper key={step.Title}>
            <CareerStep>
              <CareerStepDate>
                {calculateDate(step.StartDate, step.EndDate)}
              </CareerStepDate>
              <CareerStepHeader
                target="_blank"
                rel="noreferrer noopener"
                href={step.CompanyLink}
              >
                {step.title}
              </CareerStepHeader>
              <CareerStepDesc>{step.Desc}</CareerStepDesc>
            </CareerStep>
          </CareerStepWrapper>
        ))}
      </Flickity>
    </CareerWrapper>
  )
}
