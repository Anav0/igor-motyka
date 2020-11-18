import React from "react"
import * as THREE from "three"
import styled from "styled-components"
import SimplexNoise from "simplex-noise"
import PointCursorLight from "src/components/point-cursor-light"
import Particles from "src/components/particles"

var simplex = new SimplexNoise(Math.random)

var _event = {
  y: 0,
  deltaY: 0,
}
var percentage = 0,
  touchStartY,
  stones,
  divContainer,
  maxHeight,
  initCameraY = 500,
  camera,
  scene,
  renderer,
  count = 0,
  blob,
  blobGeo,
  blobMaterial,
  cursorLight,
  plane,
  planeGeo,
  planeMaterial,
  isBlackListed = false,
  showBlob = false

function initRenderer() {
  let canvas = document.getElementById("waveCanvas")
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true,
  })

  renderer.setClearColor(0x000000, 1)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000,
  )
  camera.position.z = 3000
  camera.position.y = initCameraY
}

function initLights() {
  if (showBlob) {
    let light = new THREE.DirectionalLight(0x404040, 2.25)
    light.target = blob
    scene.add(light)
  }
  cursorLight = new PointCursorLight(camera)
  scene.add(cursorLight.light)
}

function initBlob() {
  let angles = 64
  blobGeo = new THREE.SphereGeometry(900, angles, angles)

  blobMaterial = new THREE.MeshStandardMaterial({
    color: 0xc50e40, //new THREE.Color(`hsl(45,100%,35%)`),
    emissive: "black",
    roughness: 0,
    metalness: 0,
  })
  blob = new THREE.Mesh(blobGeo, blobMaterial)
  blob.position.y = 1800
  scene.add(blob)
  renderBlob()
}

function initBackground() {
  // TODO: fit him
  let size = 20000
  planeGeo = new THREE.BoxGeometry(size, size, 1, 64, 64)

  let config = {
    color: 0xc50e40,
    shininess: 100,
    opacity: 1,
    specular: 0x000000,
  }
  if (isBlackListed)
    config = {
      color: 0xc50e40,
      shininess: 100,
      opacity: 1,
      specular: 0x000000,
      emissive: 0xc50e40,
      emissiveIntensity: 0.09,
    }
  planeMaterial = new THREE.MeshPhongMaterial(config)
  plane = new THREE.Mesh(planeGeo, planeMaterial)
  plane.position.z = -300

  scene.add(plane)
}

function init() {
  scene = new THREE.Scene()
  initRenderer()
  initCamera()
  initBlob()
  initBackground(isBlackListed)
  initLights(isBlackListed)
  let offsetY = 2500
  if (isBlackListed) offsetY = 1000
  if (window.innerWidth < 500)
    stones = new Particles(scene, 500, 5000, 0, offsetY)
  else stones = new Particles(scene, 1500, 5000, 0, offsetY)
  window.addEventListener("resize", onWindowResize, false)
  window.addEventListener("wheel", onMouseWheel, false)
  window.addEventListener("touchstart", onTouchStart, false)
  window.addEventListener("touchmove", onTouchMove, false)
}

function onMouseWheel(e) {
  var evt = _event
  evt.deltaY = e.wheelDeltaY || e.deltaY * -1
  evt.deltaY *= 0.5
  scroll(e)
}

function lerp(a, b, t) {
  return (1 - t) * a + t * b
}

function onTouchStart(e) {
  var t = e.targetTouches ? e.targetTouches[0] : e
  touchStartY = t.pageY
}

function onTouchMove(e) {
  var evt = _event
  var t = e.targetTouches ? e.targetTouches[0] : e
  evt.deltaY = (t.pageY - touchStartY) * 5
  touchStartY = t.pageY
  scroll(e)
}

function scroll(e) {
  var evt = _event
  if (evt.y + evt.deltaY > 0) {
    evt.y = 0
  } else if (-(evt.y + evt.deltaY) >= maxHeight) {
    evt.y = -maxHeight
  } else {
    evt.y += evt.deltaY
  }
}

function onWindowResize() {
  showBlob = !isBlackListed && window.innerWidth >= 1024
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

function scrollCamera() {
  percentage = lerp(getScrollPercent(), -_event.y, 0.07)
  camera.position.y = initCameraY - percentage * 25
  camera.updateProjectionMatrix()
}

function removeBlob() {
  scene.remove(blob)
}

function renderBlob() {
  let time = performance.now() * 0.0005

  let k = 1
  for (var i = 0; i < blob.geometry.vertices.length; i++) {
    var p = blob.geometry.vertices[i]
    p.normalize().multiplyScalar(
      900 + 125 * simplex.noise3D(p.x * k + time, p.y * k, p.z * k),
    )
  }
  blob.geometry.computeVertexNormals()
  blob.geometry.mergeVertices()
  blob.geometry.normalsNeedUpdate = true
  blob.geometry.verticesNeedUpdate = true
}

function render() {
  if (showBlob) renderBlob()

  scrollCamera()
  stones.render()
  if (count > 30 && percentage >= 45) stones.shouldFire = true
  renderer.render(scene, camera)
  count += 0.1
}

function getScrollPercent() {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight"
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
}

const BackgroundCanvas = styled.canvas`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  left: 0;
`

export default class WebGlBackground extends React.Component {
  constructor(props) {
    super(props)
  }

  blackList = ["/resume", "/demos"]

  componentDidMount() {
    divContainer = document.body
    maxHeight =
      (divContainer.clientHeight || divContainer.offsetHeight) -
      window.innerHeight
    isBlackListed = this.blackList.includes(this.props.location.pathname)
    showBlob = !isBlackListed && window.innerWidth >= 1024
    init()
    animate()
    if (!showBlob) removeBlob()
  }

  render() {
    return <BackgroundCanvas id="waveCanvas"></BackgroundCanvas>
  }
}
