import React from "react"
import * as THREE from "three"
var camera, scene, renderer, clock, particle, delta, smokeParticles, text

function init() {
  clock = new THREE.Clock()
  let canvas = document.getElementById("webGl")
  renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setSize(window.innerWidth, window.innerHeight)

  scene = new THREE.Scene()
  //scene.background = new THREE.Color(0xffffff)
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  )
  camera.position.z = 1000
  scene.add(camera)

  let textGeo = new THREE.PlaneGeometry(275, 125)
  textGeo.needsUpdate = true

  let loader = new THREE.TextureLoader()
  let textTexture = loader.load(
    "https://storage.googleapis.com/igormotyka/text.png"
  )
  let textMaterial = new THREE.MeshLambertMaterial({
    color: 0xfa8072,
    opacity: 1,
    map: textTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
  })
  text = new THREE.Mesh(textGeo, textMaterial)
  text.position.z = 800
  scene.add(text)
  scaleText()

  let light = new THREE.DirectionalLight(0xffffff, 0.5)
  light.position.set(-1, 0, 1)
  scene.add(light)

  let smokeTexture = loader.load(
    "https://storage.googleapis.com/igormotyka/smoke.png"
  )
  let smokeMaterial = new THREE.MeshLambertMaterial({
    color: 0xfa8072,
    map: smokeTexture,
    transparent: true,
  })
  let smokeGeo = new THREE.PlaneGeometry(300, 300)
  smokeGeo.needsUpdate = true
  smokeParticles = []

  for (let p = 0; p < 150; p++) {
    particle = new THREE.Mesh(smokeGeo, smokeMaterial)
    particle.position.set(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 1000 - 100
    )
    particle.rotation.z = Math.random() * 360
    scene.add(particle)
    smokeParticles.push(particle)
  }
}

function animate() {
  delta = clock.getDelta()
  requestAnimationFrame(animate)
  evolveSmoke()
  render()
}

function evolveSmoke() {
  let sp = smokeParticles.length
  while (sp--) {
    smokeParticles[sp].rotation.z += delta * 0.2
  }
}

function render() {
  renderer.render(scene, camera)
}

function scaleText() {
  if (window.innerWidth < 600 && window.innerWidth > 300) {
    text.scale.set(0.5, 0.5, 0.5)
  } else if (window.innerWidth < 300) text.scale.set(0.25, 0.25, 0.25)
  else text.scale.set(1, 1, 1)
}
export default class Greeting extends React.Component {
  componentDidMount() {
    init()
    animate()
    var resizeTimer
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        scaleText()
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }, 250)
    })
  }
  render() {
    return <canvas id="webGl"></canvas>
  }
}
