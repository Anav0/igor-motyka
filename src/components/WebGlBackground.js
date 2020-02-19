import React from "react"
import * as THREE from "three"
import styled from "styled-components"
import SimplexNoise from "simplex-noise"
import PointCursorLight from "src/components/PointCursorLight"
import Particles from "src/components/Particles"

var simplex = new SimplexNoise(Math.random)

var SEPARATION = 100,
  AMOUNTX = 50,
  AMOUNTY = 50

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

function initDottedPlane() {
  var numParticles = AMOUNTX * AMOUNTY
  var scales = new Float32Array(numParticles)
  var positions = new Float32Array(numParticles * 3)
  var i = 0,
    j = 0

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2 // x
      positions[i + 1] = 0 // y
      positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2 // z

      scales[j] = 1

      i += 3
      j++
    }
  }

  var geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1))

  var material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color("hsl(0, 100%, 50%)") },
    },
    vertexShader:
      "attribute float scale;			void main() {				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );				gl_PointSize = scale * ( 300.0 / - mvPosition.z );				gl_Position = projectionMatrix * mvPosition;			}",
    fragmentShader:
      "uniform vec3 color;			void main() {				if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;				gl_FragColor = vec4( color, 1.0 );			}",
  })
  particles = new THREE.Points(geometry, material)
  scene.add(particles)
}
function initShapes() {
  boxGeo = new THREE.DodecahedronBufferGeometry(900, 0)
  boxMaterial = new THREE.MeshLambertMaterial({
    color: "red",
    emissive: "yellow",
    wireframe: true,
    emissiveIntensity: 0.7,
  })
  box = new THREE.Mesh(boxGeo, boxMaterial)
  scene.add(box)
}
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
    color: new THREE.Color(`hsl(45,100%,35%)`),
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
  //initShapes()
  initBlob()
  initDottedPlane()
  initBackground()
  initLights()
  stones = new Particles(scene, 1250, 4000, 0, 2500)
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
function renderDottedPlane() {
  var positions = particles.geometry.attributes.position.array
  var scales = particles.geometry.attributes.scale.array
  var i = 0,
    j = 0

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      positions[i + 1] =
        Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50

      scales[j] =
        (Math.sin((ix + count) * 0.3) + 1) * 8 +
        (Math.sin((iy + count) * 0.5) + 1) * 8

      i += 3
      j++
    }
  }

  particles.geometry.attributes.position.needsUpdate = true
  particles.geometry.attributes.scale.needsUpdate = true
}
function scrollCamera() {
  percentage = lerp(getScrollPercent(), -_event.y, 0.07)
  camera.position.y = initCameraY - percentage * 25
  camera.updateProjectionMatrix()
}
function renderShapes() {
  box.rotation.y += 0.01
  box.rotation.x += 0.01
}
function changeColors() {
  if (Math.round(count) % 10 == 0) {
    let colorRange = Math.floor(count * 100)
    let color = new THREE.Color(`hsl(${colorRange},75%,50%)`)
    blobMaterial.color = color
    particles.material.uniforms.color = {
      value: color,
    }
  }
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
  changeColors()
  renderDottedPlane()
  //renderShapes()
  renderBlob()
  scrollCamera()
  stones.render()
  if (count > 18 && camera.position.y <= -1000) stones.shouldFire = true
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
