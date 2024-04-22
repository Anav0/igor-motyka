import React, { useEffect, useState } from "react"
import * as THREE from "three"
import styled from "styled-components"
import { Background } from "../models/Background"
import { CursorLight } from "../models/CursorLight"
import Particles from "../models/Particles"

const BackgroundCanvas = styled.canvas`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  left: 0;
`

export const WebGlBackground = () => {

  const hookEvents = (renderer, camera, initCameraY) => {
    window.addEventListener("resize", (e) => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }, false)
  }

  useEffect(() => {
    const initCameraY = 500;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    )
    camera.position.z = 3000
    camera.position.y = initCameraY
    const objects = [new Background(camera), new CursorLight(camera), new Particles()];

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("waveCanvas"),
      alpha: true,
    })

    renderer.setClearColor(0x000000, 1)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    hookEvents(renderer, camera, initCameraY)

    //Init objects
    for (let i = 0; i < objects.length; i++) {
      objects[i].init(scene);
    }

    //Update on frame
    const animate = () => {
      requestAnimationFrame(animate)
      for (let i = 0; i < objects.length; i++) {
        objects[i].update(scene);
      }

      renderer.render(scene, camera)
    };
    animate()
  }, [])

  return (<BackgroundCanvas id="waveCanvas" />)

}
