import React from "react"
import * as THREE from "three"
import styled from "styled-components"
import SimplexNoise from "simplex-noise"
import PointCursorLight from "src/components/PointCursorLight"
import Particles from "src/components/Particles"

var simplex = new SimplexNoise(Math.random)

var _event = {
  y: 0,
  deltaY: 0,
}
var percentage = 0,
  touchStartY
var stones
// this is the container where we will attach the scroll event. For this example we will set its height to 1200vh.
var divContainer
// container height - window height to limit the scroll at the top of the screen when we are at the bottom of the container
var maxHeight
var initCameraY = 500
var camera,
  scene,
  renderer,
  particles,
  count = 0,
  boxGeo,
  boxMaterial,
  box,
  blob,
  blobGeo,
  blobMaterial,
  cursorLight,
  plane,
  planeGeo,
  planeMaterial

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
    10000
  )
  camera.position.z = 3000
  camera.position.y = initCameraY
}
function initLights() {
  let light = new THREE.DirectionalLight(0x404040, 2.25)
  light.target = blob
  scene.add(light)

  cursorLight = new PointCursorLight(camera)
  console.log(cursorLight)
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
}
function initBackground() {
  // TODO: fit him
  planeGeo = new THREE.BoxGeometry(20000, 20000, 1, 64, 64)

  planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xc50e40,
    shininess: 100,
    opacity: 1,
    specular: 0x000000,
  })
  plane = new THREE.Mesh(planeGeo, planeMaterial)
  plane.position.z = -300

  scene.add(plane)
}
function init() {
  scene = new THREE.Scene()
  initRenderer()
  initCamera()
  initBlob()
  initBackground()
  initLights()
  if (window.innerWidth < 500) stones = new Particles(scene, 500, 5000, 0, 2500)
  else stones = new Particles(scene, 1500, 5000, 0, 2500)
  window.addEventListener("resize", onWindowResize, false)
  window.addEventListener("wheel", onMouseWheel, false)
  window.addEventListener("touchstart", onTouchStart, false)
  window.addEventListener("touchmove", onTouchMove, false)
}
function onMouseWheel(e) {
  var evt = _event
  evt.deltaY = e.wheelDeltaY || e.deltaY * -1
  // reduce by half the delta amount otherwise it scroll too fast (in a other way we could increase the height of the container too)
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
  // the multiply factor on mobile must be about 10x the factor applied on the wheel
  evt.deltaY = (t.pageY - touchStartY) * 5
  touchStartY = t.pageY
  scroll(e)
}
function scroll(e) {
  var evt = _event
  // limit scroll top
  if (evt.y + evt.deltaY > 0) {
    evt.y = 0
    // limit scroll bottom
  } else if (-(evt.y + evt.deltaY) >= maxHeight) {
    evt.y = -maxHeight
  } else {
    evt.y += evt.deltaY
  }
}
function onWindowResize() {
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

function renderBlob() {
  //blob.rotation.x += 0.005
  //blob.rotation.y += 0.0045
  // change '0.003' for more aggressive animation
  let time = performance.now() * 0.0005

  let k = 1
  for (var i = 0; i < blob.geometry.vertices.length; i++) {
    var p = blob.geometry.vertices[i]
    p.normalize().multiplyScalar(
      900 + 125 * simplex.noise3D(p.x * k + time, p.y * k, p.z * k)
    )
  }
  blob.geometry.computeVertexNormals()
  blob.geometry.mergeVertices()
  blob.geometry.normalsNeedUpdate = true
  blob.geometry.verticesNeedUpdate = true
}
function render() {
  renderBlob()
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
  componentDidMount() {
    // this is the container where we will attach the scroll event. For this example we will set its height to 1200vh.
    divContainer = document.body
    // container height - window height to limit the scroll at the top of the screen when we are at the bottom of the container
    maxHeight =
      (divContainer.clientHeight || divContainer.offsetHeight) -
      window.innerHeight

    init()
    animate()
  }

  render() {
    return <BackgroundCanvas id="waveCanvas"></BackgroundCanvas>
  }
}
