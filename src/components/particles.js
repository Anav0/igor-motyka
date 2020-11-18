import * as THREE from "three"

export default class Particles {
  constructor(scene, amount = 1500, spread = 5000, offsetX = 0, offsetY = 0) {
    this.scene = scene
    this.geometry = new THREE.BufferGeometry()
    this.amount = amount
    this.spread = spread
    var positions = []
    var colors = []

    var color = new THREE.Color()

    var n = spread,
      n2 = n / 2 // particles spread in the cube

    for (var i = 0; i < amount; i++) {
      var x = Math.random() * n - n2 - offsetX
      var y = Math.random() * n - n2 - offsetY
      var z = Math.random() * n - n2

      positions.push(x, y, z)

      var r = x / n + 0.5
      var g = y / n + 0.5
      var b = z / n + 0.5

      color.setRGB(r, g, b)

      colors.push(color.r, color.g, color.b)
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    this.geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    )

    this.geometry.computeBoundingSphere()

    this.material = new THREE.PointsMaterial({
      size: 15,
      vertexColors: THREE.VertexColors,
    })

    this.points = new THREE.Points(this.geometry, this.material)
    scene.add(this.points)
  }

  render() {
    let positions = this.points.geometry.attributes.position.array

    if (!this.shouldFire) {
      for (let k = 2; k < positions.length; k += 3) {
        let speed = (Math.random() * k) / 5000
        positions[k - 3] += positions[k - 3] > 500 ? speed : -speed
        positions[k - 2] += positions[k - 2] > 500 ? speed : -speed
        positions[k - 1] += positions[k - 1] > 500 ? speed : -speed
      }
    } else {
      for (let i = 2; i < positions.length; i += 3) {
        positions[i - 3] += (15 * i) / 500
        positions[i - 2] += 0
        positions[i - 1] += (2 * i) / 500
      }
    }
    this.points.geometry.attributes.position.needsUpdate = true
  }
}
