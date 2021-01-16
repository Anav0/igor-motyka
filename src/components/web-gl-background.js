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
  // const getScrollPercent = () => {
  //   const h = document.documentElement,
  //     b = document.body,
  //     st = "scrollTop",
  //     sh = "scrollHeight"
  //   return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
  // }

  // const lerp = (a, b, t) => {
  //   return (1 - t) * a + t * b
  // }

  const updateCamera = (e, camera, initCameraY) => {
    // const minHeight = 0;
    // const maxHeight = window.innerHeight;

    // if (camera.position.y + increaseBy < maxHeight && e.deltaY < 0) {
    //   console.log("SCROLL 1");
    //   camera.position.y -= 100
    // }

    // if (camera.position.y - increaseBy > minHeight && e.deltaY > 0) {
    //   console.log("SCROLL 2");
    //   camera.position.y += 100
    // }
    // camera.updateProjectionMatrix()
  }

  const hookEvents = (renderer, camera, initCameraY) => {
    window.addEventListener("resize", (e) => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }, false)

    window.addEventListener("wheel", (e) => updateCamera(e, camera, initCameraY))

    window.addEventListener("touchstart", (e) => updateCamera(e, camera, initCameraY))

    window.addEventListener("touchmove", (e) => updateCamera(e, camera, initCameraY))
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
