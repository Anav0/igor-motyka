import React from "react"
import Flickity from "react-flickity-component"
import { graphql, useStaticQuery } from "gatsby"
import { career } from "src/data/career.js"

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
  return (
    <CareerWrapper>
      <Flickity
        className={"carousel"}
        elementType={"div"}
        options={flickityOptions}
      >
        {career.map((step) => (
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
