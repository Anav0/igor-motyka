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
  const [touchStartY, setTouchStartY] = useState(0);
  const [camera, setCamera] = useState(new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000,
  ));
  const [renderer, setRenderer] = useState();
  const [scene, setScene] = useState(new THREE.Scene());
  const [maxHeight, setMaxheight] = useState();
  const [evt, setEvt] = useState({
    y: 0,
    deltaY: 0,
  });
  const [objects, _] = useState([new Background(), new CursorLight(camera), new Particles()]);

  const scroll = (_) => {
    if (evt.y + evt.deltaY > 0) {
      evt.y = 0
    } else if (-(evt.y + evt.deltaY) >= maxHeight) {
      evt.y = -maxHeight
    } else {
      evt.y += evt.deltaY
    }
  }

  const getScrollPercent = () => {
    const h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight"
    return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
  }

  const lerp = (a, b, t) => {
    return (1 - t) * a + t * b
  }

  const hookEvents = () => {
    window.addEventListener("resize", (e) => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }, false)

    window.addEventListener("wheel", (e) => {
      setEvt({
        y: 0,
        deltaY: 0,
      })
      evt.deltaY = e.wheelDeltaY || e.deltaY * -1
      evt.deltaY *= 0.5
      scroll(e)
    }, false)

    window.addEventListener("touchstart", (e) => {
      const t = e.targetTouches ? e.targetTouches[0] : e
      setTouchStartY(t.pageY)
    }, false)

    window.addEventListener("touchmove", (e) => {
      const t = e.targetTouches ? e.targetTouches[0] : e
      evt.deltaY = (t.pageY - touchStartY) * 5
      setTouchStartY(t.pageY)
      scroll(e)
    }, false)
  }

  useEffect(() => {
    const initCameraY = 500;

    setMaxheight((document.body.clientHeight || document.body.offsetHeight) -
      window.innerHeight)

    camera.position.z = 3000
    camera.position.y = initCameraY

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("waveCanvas"),
      alpha: true,
    })
    renderer.setClearColor(0x000000, 1)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    setRenderer(renderer);

    hookEvents()

    //Init objects
    for (let i = 0; i < objects.length; i++) {
      objects[i].init(scene);
    }

    const percentage = lerp(getScrollPercent(), - evt.y, 0.07)
    camera.position.y = initCameraY - percentage * 25
    camera.updateProjectionMatrix()

    //Update on frame
    requestAnimationFrame(() => {
      for (let i = 0; i < objects.length; i++) {
        objects[i].update(scene);
      }
      renderer.render(scene, camera)
    })
  }, [])




  return (<BackgroundCanvas id="waveCanvas" />)

}
