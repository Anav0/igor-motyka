import * as THREE from "three"

function onMouseMove(event, light, camera) {
  if (!light) return

  let mouse = {
    x: 0,
    y: 0,
  }
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5)
  vector.unproject(camera)
  let dir = vector.sub(camera.position).normalize()
  let distance = -camera.position.z / dir.z
  let pos = camera.position.clone().add(dir.multiplyScalar(distance))
  light.position.x = pos.x
  light.position.y = pos.y
  light.position.z = pos.z
}

export default class PointCursorLight {
  constructor(camera) {
    this.camera = camera
    this.light = new THREE.PointLight(0xffffff, 0.75, 0, 2)

    this.geometry = new THREE.SphereBufferGeometry(32, 32, 32)
    this.material = new THREE.MeshBasicMaterial({
      color: 0xfffafa,
    })

    this.light.add(new THREE.Mesh(this.geometry, this.material))
    this.light.position.needsUpdate = true

    window.addEventListener("wheel", event =>
      onMouseMove(event, this.light, this.camera)
    )

    window.addEventListener(
      "mousemove",
      event => onMouseMove(event, this.light, this.camera),
      false
    )
  }
}
