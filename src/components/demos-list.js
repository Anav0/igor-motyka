import React from "react"
import { Demo, DemoImg, DemosList } from "src/styled/demos-list.styled"
import { demos } from "src/data/demos.js"

const Demos = ({ namesByImagedata }) => {
  return (
    <DemosList>
      {demos.map((demo) => (
        <Demo key={demo.id} href={demo.url} target="_blank" rel="noopener">
          <DemoImg image={namesByImagedata.get(demo.imageName)} />
        </Demo>
      ))}
    </DemosList>
  )
}

export default Demos
